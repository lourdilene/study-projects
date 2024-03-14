<?php

namespace Auction\tests\Service;

use Auction\Model\Auction;
use PHPUnit\Framework\TestCase;
use Auction\Model\User;
use Auction\Model\Bid;

class EvaluatorTest extends TestCase {

    public function testOne()
    {
        $auction = new Auction('Fiat 147 0km');

        $joao = new User('João');
        $maria = new User('Maria');

        $auction->receiveBid(new Bid($joao, 2000));
        $auction->receiveBid(new Bid($maria, 2500));

        
    }

}