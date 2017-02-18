<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Matchid
 */
class Matchid
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var \DateTime
     */
    private $time;

    /**
     * @var array
     */
    private $matchIds;


    /**
     * Set time
     *
     * @param \DateTime $time
     * @return Matchid
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return \DateTime 
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set matchIds
     *
     * @param array $matchIds
     * @return Matchid
     */
    public function setMatchIds($matchIds)
    {
        $this->matchIds = $matchIds;

        return $this;
    }

    /**
     * Get matchIds
     *
     * @return array 
     */
    public function getMatchIds()
    {
        return $this->matchIds;
    }
    /**
     * @var array
     */
    private $matchTimes;


    /**
     * Set matchTimes
     *
     * @param array $matchTimes
     * @return Matchid
     */
    public function setMatchTimes($matchTimes)
    {
        $this->matchTimes = $matchTimes;

        return $this;
    }

    /**
     * Get matchTimes
     *
     * @return array 
     */
    public function getMatchTimes()
    {
        return $this->matchTimes;
    }
}
