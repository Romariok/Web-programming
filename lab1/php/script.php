<?php

$x = isset($_GET['x']) ? floatval($_GET['x']) : null;
$y = isset($_GET['y']) ? floatval($_GET['y']) : null;
$r = isset($_GET['r']) ? floatval($_GET['r']) : null;


@session_start();

date_default_timezone_set('Europe/Moscow');
$current_time = date("H:i:s");
if (!checkData($x, $y, $r)) {
   http_response_code(412);
   echo ("x={$x}, y={$y}, r={$r}");
   return;
}

$exec_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 5) . ' мс';
$result = checkCoordinates($x, $y, $r);

$_SESSION['tdata'][] = [$x, $y, $r, $current_time, $exec_time, $result];




function checkData($x, $y, $r)
{
   return in_array($x, array(-4, -3, -2, -1, 0, 1, 2, 3, 4, 5)) && is_numeric($y) && ($y >= -3 && $y <= 3) && in_array($r, array(1, 2, 3, 4, 5));
}

function checkCoordinates($x, $y, $r)
{
   if (
      ($x <= 0 && sqrt(pow($x, 2) + pow($y, 2)) <= $r / 2) && ($y >= 0 && $y <= $r / 2) || ($x >= 0 && $x <= $r - (-$y)) && ($y <= 0 && $y <= -$r) ||
      ($x >= 0 && $x <= $r) && ($y >= 0 && $y <= $r / 2)
   )
      return "Yes";
   else
      return "No";
}

foreach ($_SESSION["tdata"] as $rdata) {
   echo <<<HTML
   <tr>
       <td>$rdata[0]</td>
       <td>$rdata[1]</td>
       <td>$rdata[2]</td>
       <td>$rdata[3]</td>
       <td>$rdata[4]</td>
       <td>$rdata[5]</td>
   </tr>
HTML;
}

?>