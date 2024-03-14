<?php

for ($i = 0; $i < 100; $i++) {
    if (($i % 2) != 0)
        echo $i . PHP_EOL;
}

$multiplicador = 2;

for ($i = 1; $i <= 9; $i++) {
    echo "$i x $multiplicador = " . $i * $multiplicador .PHP_EOL;
}

$peso = 37;
$altura = 1.60;

$imc = $peso / $altura ** 2;

$classificacao = match (true){
    $imc < 18.5 => 'Magreza',
    $imc <= 24.9 => 'Peso Normal',
    $imc <= 29.9 => 'Sobrepeso',
    $imc <= 34.9 => 'Obesidade grau I',
};

echo $classificacao;