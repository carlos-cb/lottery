<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use JonnyW\PhantomJs\Client;
use Symfony\Component\DomCrawler\Crawler;

class ClientController extends Controller
{
    public function dataAction()
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

        $j = 0;
        $messages = array();
        foreach ($matchIds as $matchId){
            $request  = $client->getMessageFactory()->createRequest("http://vip.win007.com/AsianOdds_n.aspx?id=$matchId", 'GET');
            $client->send($request, $response);
            $messages[$j] = $response->getContent();
            $j++;
            if($j >= 3){
                break;
            }
        }

        return $this->render('AppBundle:Default:data.html.twig', array(
            'matchIds' => $matchIds,
            'messages' => $messages,
            'startTimes' => $startTimes,
        ));
    }

    private function getContentMain()
    {
        $client = Client::getInstance();
        $client->isLazy();
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

    public function emailAction()
    {
        $client = Client::getInstance();
        $client->isLazy();
        $url = $this->getParameter('js_path');
        $client->getEngine()->setPath($url);

        $request  = $client->getMessageFactory()->createRequest("http://vip.win007.com/AsianOdds_n.aspx?id=1250365", 'GET');
        $response = $client->getMessageFactory()->createResponse();
        $client->send($request, $response);
        $messages[0] = $response->getContent();

        $request  = $client->getMessageFactory()->createRequest("http://vip.win007.com/AsianOdds_n.aspx?id=1352341", 'GET');
        $response = $client->getMessageFactory()->createResponse();
        $client->send($request, $response);
        $messages[1] = $response->getContent();

        $matchIds = array(1250365, 1352341);
        
        return $this->render('AppBundle:Default:email.html.twig', array(
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
    }
}
