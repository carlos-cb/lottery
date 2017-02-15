<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;


class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AppBundle:Default:index.html.twig');
    }
    
    public function emailAction()
    {

        $client = new Client();
        $crawler = $client->request('GET', 'http://vip.win007.com/AsianOdds_n.aspx?id=1250365');
        $messages = $crawler->filter('td[class="teamname"]')->each(function (Crawler $node, $i){
            return str_replace("报错", "", $node->text());
        });

        return $this->render('AppBundle:Default:email.html.twig', array(
            'messages' => $messages,
        ));
    }
}
