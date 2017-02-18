<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use JonnyW\PhantomJs\Client;
use Goutte\Client as goutte;
use Symfony\Component\DomCrawler\Crawler;
use AppBundle\Entity\Matchid;

class ClientController extends Controller
{
    public function dataPhantomAction()
    {
        set_time_limit(0);
        $contentMain = $this->getContentMain();
        $matchIds = $this->getMatchIds($contentMain);
        $startTimes = $this->getStartTimes($contentMain);
        $client = Client::getInstance();
        $client->isLazy();
        $url = $this->getParameter('js_path');
        $client->getEngine()->setPath($url);
        $response = $client->getMessageFactory()->createResponse();
        $messages = array();
        foreach ($matchIds as $j => $matchId){
            $request  = $client->getMessageFactory()->createRequest("http://vip.win007.com/AsianOdds_n.aspx?id=$matchId", 'GET');
            $client->send($request, $response);
            $messages[$j] = $response->getContent();
            if($j > 5){
                break;
            }
        }

        return $this->render('AppBundle:Default:data.html.twig', array(
            'matchIds' => $matchIds,
            'messages' => $messages,
            'startTimes' => $startTimes,
        ));
    }

    public function getContentMain()
    {
        $client = Client::getInstance();
        $client->isLazy();
        $client->getEngine()->addOption('--load-images=false');
        $url = $this->getParameter('js_path');
        $client->getEngine()->setPath($url);

        $request  = $client->getMessageFactory()->createRequest('http://live.titan007.com/', 'GET');
        $response = $client->getMessageFactory()->createResponse();
        $client->send($request, $response);

        return $response->getContent();
    }

    private function getMatchIds($contentMain)
    {
        $crawler = new Crawler($contentMain);
        $matchIds = $crawler->filter('img[src="bf_img/in.gif"], td[id^="time_"] > font[color="blue"]')->each(function (Crawler $node, $i){
            return str_replace("time_", "", $node->parents()->attr('id'));
        });

        return $matchIds;
    }

    private function getStartTimes($contentMain)
    {
        $crawler = new Crawler($contentMain);
        $startTimes = $crawler->filter('table#table_live td[id^="mt_"]')->each(function (Crawler $node, $i){
            return $node->text();
        });

        return $startTimes;
    }

    public function testPhantomAction()
    {
        $client = Client::getInstance();
        $client->getEngine()->addOption('--load-images=false');
        $url = $this->getParameter('js_path');
        $client->getEngine()->setPath($url);

        $matchIds = array(1357349, 1347556, 1346677, 1357216, 1356395, 1356396, 1354384);
        $response = $client->getMessageFactory()->createResponse();
        $messages = array();
        foreach ($matchIds as $i => $matchId){
            $request  = $client->getMessageFactory()->createRequest("http://vip.win007.com/AsianOdds_n.aspx?id=$matchId", 'GET');
            $client->send($request, $response);
            $messages[$i] = $response->getContent();
        }
        
        return $this->render('AppBundle:Default:data.html.twig', array(
            'messages' => $messages,
            'matchIds' => $matchIds,
        ));
    }
    
    public function sendEmailsAction(Request $request)
    {
        $arrayText = $request->get('val2');
        $text = implode("<br>",$arrayText);

        $messageClient = \Swift_Message::newInstance()
            ->setSubject('符合规则提示')
            ->setFrom(array('info@lottery.com' => '365rich'))
            ->setTo('carloschubei@gmail.com')
            ->setContentType('text/html')
            ->setBody($text);
        $this->get('mailer')->send($messageClient);

        return new Response();
    }

    public function dataCurlMultiAction()
    {
        $em = $this->getDoctrine()->getManager();
        $matchIds = $em->getRepository('AppBundle:Matchid')->findOneById(1)->getMatchIds();

        $mh = curl_multi_init();
        $conn = array();
        $messages = array();
        foreach ($matchIds as $i => $matchId){
            $conn[$i] = curl_init();
            curl_setopt($conn[$i], CURLOPT_URL, "http://vip.win007.com/AsianOdds_n.aspx?id=$matchId");
            curl_setopt($conn[$i], CURLOPT_RETURNTRANSFER, true);
            curl_setopt($conn[$i], CURLOPT_TIMEOUT, 9);
            curl_multi_add_handle($mh,$conn[$i]);
        }

        do { curl_multi_exec($mh,$active); } while ($active);
        /* do {
             $mrc = curl_multi_exec($mh,$active);
         } while($mrc == CURLM_CALL_MULTI_PERFORM);
         while ($active and $mrc == CURLM_OK) {
             if (curl_multi_select($mh) != -1) {
                 do {
                     $mrc = curl_multi_exec($mh, $active);
                 } while ($mrc == CURLM_CALL_MULTI_PERFORM);
             }
         }*/

        foreach ($matchIds as $i => $matchId){
            $messages[$i]= mb_convert_encoding(curl_multi_getcontent($conn[$i]), "utf-8", "gb2312");
            curl_multi_remove_handle($mh, $conn[$i]);
            curl_close($conn[$i]);
        }
        curl_multi_close($mh);

        return $this->render('AppBundle:Default:data.html.twig', array(
            'matchIds' => $matchIds,
            'messages' => $messages,
        ));
    }

    public function getMatchIdsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $newMatch = $em->getRepository('AppBundle:Matchid')->findOneById(1);
        $contentMain = $this->getContentMain();
        $matchIds = $this->getMatchIds($contentMain);
        $startTimes = $this->getStartTimes($contentMain);

        $newMatch->setTime(new \DateTime('now'))
                 ->setMatchIds($matchIds)
                 ->setMatchTimes($startTimes)
        ;
        $em->persist($newMatch);
        $em->flush();

        return $this->render('AppBundle:Default:test.html.twig', array(
            'code' => $newMatch->getTime(),
            'messages' => $newMatch->getMatchIds(),
            'times' => $newMatch->getMatchTimes(),
        ));
    }
}
