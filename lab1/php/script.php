<?php



@session_start();

date_default_timezone_SET($_GET["timezone"]);
$x = (float) $_GET["x"];
$y = (float) $_GET["y"];
$r = (float) $_GET["r"];



function checkData($x, $y, $r)
{
   return in_array($x, array(-4, -3, -2, -1, 0, 1, 2, 3, 4, 5)) && is_numeric($y) && ($y >= -3 && $y <= 3) && in_array($r, array(1, 2, 3, 4, 5));
}

function checkCoordinates($x, $y, $r)
{
   if (
      ($x <= 0 && sqrt(($x * $x) + ($y * $y)) <= $r / 2) && ($y >= 0 && $y <= $r / 2) || ($x >= 0 && $x <= $r + $y) && ($y <= 0 && $y <= -$r) ||
      ($x >= 0 && $x <= $r) && ($y >= 0 && $y <= $r / 2)
   )
      return "Yes";
   else
      return "No";
}
?>