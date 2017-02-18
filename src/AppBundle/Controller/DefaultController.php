<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Goutte\Client as goutte;
use GuzzleHttp;
use Symfony\Component\DomCrawler\Crawler;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AppBundle:Default:index.html.twig');
    }

    public function testGoutteAction()
    {
        $client = new goutte();
        $text = array();
        $matchIds = array(1349166, 1357216);
        foreach ($matchIds as $matchId){
            $crawler = $client->request('GET', "http://vip.win007.com/AsianOdds_n.aspx?id=$matchId");
            array_push($text, $crawler->html());
        }

        return $this->render('AppBundle:Default:data.html.twig', array(
            'messages' => $text,
            'matchIds' => $matchIds,
        ));

    }

    public function testGuzzleAction()
    {
        //guzzle client
        $client = new GuzzleHttp\Client();

        $res = $client->request('GET', 'http://vip.win007.com/AsianOdds_n.aspx?id=1357349');
        $messages =  $res->getBody();
        $messages = mb_convert_encoding($messages, "utf-8", "gb2312");

        return $this->render('AppBundle:Default:data.html.twig', array(
            'messages' => $messages,
            'matchIds' => (1),
        ));
    }

    public function testCurlOneAction()
    {
        //php curl单线程
        $matchIds = array(1359027,1345274,1358408);
        $curlobj = curl_init();
        $text = array();
        curl_setopt($curlobj, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlobj, CURLOPT_TIMEOUT, 10);
        foreach ($matchIds as $matchId){
            curl_setopt($curlobj, CURLOPT_URL, "http://vip.win007.com/AsianOdds_n.aspx?id=$matchId");
            array_push($text, mb_convert_encoding(curl_exec($curlobj), "utf-8", "gb2312"));
        }
        curl_close($curlobj);

        return $this->render('AppBundle:Default:data.html.twig', array(
            'messages' => $text,
            'matchIds' => $matchIds,
        ));
    }

    public function testCurlMultiAction()
    {
        //php curl多线程
        $matchIds = array(1359027,1345274,1358408);
        $mh = curl_multi_init();
        $conn = array();
        $text = array();
        foreach ($matchIds as $i => $matchId){
            $conn[$i] = curl_init();
            curl_setopt($conn[$i], CURLOPT_URL, "http://vip.win007.com/AsianOdds_n.aspx?id=$matchId");
            curl_setopt($conn[$i], CURLOPT_RETURNTRANSFER, true);
            curl_setopt($conn[$i], CURLOPT_TIMEOUT, 7);
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
            $text[$i]= mb_convert_encoding(curl_multi_getcontent($conn[$i]), "utf-8", "gb2312");
            curl_multi_remove_handle($mh, $conn[$i]);
            curl_close($conn[$i]);
        }
        curl_multi_close($mh);

        return $this->render('AppBundle:Default:data.html.twig', array(
            'messages' => $text,
            'matchIds' => $matchIds,
        ));
    }
}
