<?php

namespace Auction\Model;

class Auction
{
    /** @var Bid[] */
    private $bid;
    /** @var string */
    private $description;

    public function __construct(string $description)
    {
        $this->description = $description;
        $this->bid = [];
    }

    public function receiveBid(Bid $bid)
    {
        $this->bid[] = $bid;
    }

    /**
     * @return Bid[]
     */
    public function getBid(): array
    {
        return $this->bid;
    }
}
