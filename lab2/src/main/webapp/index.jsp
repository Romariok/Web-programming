<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru-RU">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Лабораторная No 1 по дисциплине веб-программирование">
    <meta name="author" content="Кобелев Роман Павлович P3212">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./img/favicon.ico">
    <link href="css/main_page.css" rel="stylesheet">
    <link href="css/check_button.css" rel="stylesheet">
    <title> Лабораторная No 2</title>
</head>
<body>

<header>
    <h1>Кобелев Роман Павлович, P3212, Вариант 2251</h1>
</header>
<div class="graph">

    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="150" x2="300" y2="150" stroke="#000720"></line>
        <line x1="150" y1="0" x2="150" y2="300" stroke="#000720"></line>
        <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000720"></polygon>
        <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000720"></polygon>
        <text x="282" y="170">x</text>
        <text x="163" y="14">y</text>
        <line x1="270" y1="148" x2="270" y2="152" stroke="#000720"></line>
        <text x="265" y="140">
            <tspan class="graph_value">R</tspan>
        </text>
        <line x1="210" y1="148" x2="210" y2="152" stroke="#000720"></line>
        <text x="200" y="140">
            <tspan class="graph_value">R</tspan>/2
        </text>
        <line x1="90" y1="148" x2="90" y2="152" stroke="#000720"></line>
        <text x="75" y="140">-<tspan class="graph_value">R</tspan>/2</text>
        <line x1="30" y1="148" x2="30" y2="152" stroke="#000720"></line>
        <text x="20" y="140">-<tspan class="graph_value">R</tspan></text>
        <line x1="148" y1="30" x2="152" y2="30" stroke="#000720"></line>
        <text x="156" y="35">
            <tspan class="graph_value">R</tspan>
        </text>
        <line x1="148" y1="90" x2="152" y2="90" stroke="#000720"></line>
        <text x="156" y="95">
            <tspan class="graph_value">R</tspan>/2
        </text>
        <line x1="148" y1="210" x2="152" y2="210" stroke="#000720"></line>
        <text x="156" y="215">-<tspan class="graph_value">R</tspan>/2</text>
        <line x1="148" y1="270" x2="152" y2="270" stroke="#000720"></line>
        <text x="156" y="275">-<tspan class="graph_value">R</tspan></text>

        <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000720"></polygon>

        <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000720"></polygon>
        <%--parallelepiped--%>
        <rect x="150" y="150" width="120" height="60" fill-opacity="0.4" stroke="navy" fill="blue"></rect>
        <%--RECTANGLE--%>
        <polygon points="150,150 150,30 90, 150" fill-opacity="0.4" stroke="navy" fill="blue"></polygon>
        <%--CIRCLE--%>
        <path d="M150 150 L 210 150 C 210 150 210 90 150 90 L Z" fill-opacity="0.4" stroke="navy" fill="blue"></path>
                <circle id="pointer" r="5" cx="150" cy="150" fill-opacity="0.7" fill="red" stroke="firebrick" visibility="hidden"
                ></circle>

    </svg>

</div>

<div class="input_area">
        <%@
            
        %>
    
    
        
        <div class="button_area">
            <label>Изменение X</label>
            <br>
            <button id="btn_4" name="x" class="button-X" value="-4" type='button'>-4</button>
            <button id="btn_3" name="x" class="button-X" value="-3" type='button'>-3</button>
            <button id="btn_2" name="x" class="button-X" value="-2" type='button'>-2</button>
            <button id="btn_1" name="x" class="button-X" value="-1" type='button'>-1</button>
            <button id="btn0" name="x" class="button-X" value="0" type='button'>0</button>
            <button id="btn1" name="x" class="button-X" value="1" type='button'>1</button>
            <button id="btn2" name="x" class="button-X" value="2" type='button'>2</button>
            <button id="btn3" name="x" class="button-X" value="3" type='button'>3</button>
            <button id="btn4" name="x" class="button-X" value="4" type='button'>4</button>
            <br>
        </div>
        <div class="text_area">
            <label>Изменение Y {-5...5}</label>
            <br>
            <input type="text" id="textY" class="textY" name="y" placeholder="значение в промежутке (-5 до 5)" maxlength="15">
        </div>
        <div class="checkboxes">
            <label>Изменение R</label>
            <br>
            <label><input type="checkbox"  name="r" value="1">
                1</label>
            <label><input type="checkbox"  name="r" value="2">
                2</label>
            <label><input type="checkbox"  name="r" value="3">
                3</label>
            <label><input type="checkbox"  name="r" value="4">
                4</label>
            <label><input type="checkbox"  name="r" value="5">
                5</label>
            <br>
        </div>

        <div class="Buttons">
            <button id="submitButton" type="submit">Проверить</button>
            <button class="reset_button" id="clearButton" type="reset">Очистить</button>
        </div>


    <div id="outputContainer">
        <h4><span class="outputStub notification">Результаты отсутствуют</span></h4>
    </div>
</div>

<div class="main__table-block" id="main__table-block">
    <table class="main__table" id ="main__table">
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Запуск</th>
            <th>Работа</th>
            <th>Результат</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

</body>
<script src="js/validator.js"></script>
<script src="js/graph_validator.js"></script>
</html>