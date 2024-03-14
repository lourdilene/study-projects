<?php

require_once 'src/Conta.php';
require_once 'src/Endereco.php';
require_once 'src/Titular.php';
require_once 'src/CPF.php';

$endereco = new Endereco('Belém', 'Um Bairro', 'Uma rua', '123');
$fulano = new Titular(new CPF('123.456.789-10'), 'Fulano da Silva', $endereco);
$primeiraConta = new Conta($fulano);
$primeiraConta->deposita(500);
$primeiraConta->saca(300); // isso é ok

echo $primeiraConta->recuperaNomeTitular() . PHP_EOL;
echo $primeiraConta->recuperaCpfTitular() . PHP_EOL;
echo $primeiraConta->recuperaSaldo() . PHP_EOL;

$beltrano = new Titular(new CPF('698.549.548-10'), 'Beltrano de Souza', $endereco);
$segundaConta = new Conta($beltrano);
var_dump($segundaConta);

$outra = new Conta(new Titular(new CPF('123.654.789-01'), 'Abcdefg', $endereco));
unset($segundaConta);
echo Conta::recuperaNumeroDeContas();
