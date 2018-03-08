<html>
<head>
  <title>Арабский мир</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" type="text/css" href="./fonts/ds-arabic.css">
</head>
<body>

  <div class="sitehead">
    <a href="./index.html"><img class="logo" src="./images/logo.png" alt="Логотип"></a>
	<h1>Арабский мир</h1>
  </div>

<aside>
  <div class="block">
    <div class="block_header">
	Меню сайта
	</div>

	<ul>
      <li><a href="./index.html">Главная</a></li>
      <li><a href="./iraq.html">Ирак</a></li>
      <li><a href="./yemen.html">Йемен</a></li>
      <li><a href="./saudi_arabia.html">Саудовская Аравия</a></li>
      <li><a href="./about.html">Об Авторе</a></li>
      <li><a href="./laba2.php">Lab 2</a></li>
    </ul>
  </div>
</aside>

<section>
  <div class="main">
    <h3>Лабораторная N2</h2>
      <form name="form" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" >
        <p>
          Введите число для подсчета суммы его цифр:<br>
          <input type="text" name="numberfield">
          <input type="submit" name="submitbutton" value="Вычислить">
        </p>
      </form>

      <?php
        if (isset($_POST['submitbutton']))
        {
          $number = $_POST["numberfield"];
          $message = "Success! You entered: ".$number;

          while ($number > 0) {
            $digit = $digit + $number % 10;
          }
          echo $digit;
        }
      ?>

  </div>
</section>

  <div class="sitefoot">
    © Илья Савенок
  </div>

</body>
</html>
