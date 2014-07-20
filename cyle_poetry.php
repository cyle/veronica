<?php

// get http://cylegage.com/poetry/
// follow the links in the <ul>
// get whatever is in the <div id="poem">

require_once('simple_html_dom.php'); // http://simplehtmldom.sourceforge.net/

$poetry_base = 'http://cylegage.com/poetry/';

$poetry_html = file_get_html($poetry_base);

$poetry_links = array();

foreach ($poetry_html->find('a') as $poetry_link) {
  $poetry_links[] = $poetry_link->href;
}

$random_poem_link = $poetry_base . $poetry_links[array_rand($poetry_links)];

//$poem_html = file_get_html($random_poem_link);
$poem_html = file_get_html($random_poem_link, false, null, -1, -1, false, true, DEFAULT_TARGET_CHARSET, false);

$poem_text = $poem_html->find('div#poem')[0]->plaintext;

//echo $poem_text;

$poem_lines = explode("\n", $poem_text);

for ($i = 0; $i < count($poem_lines); $i++) {
  if (trim($poem_lines[$i]) == '') {
    unset($poem_lines[$i]);
  }
}

$poem_lines = array_values($poem_lines);

$random_poem_line = $poem_lines[array_rand($poem_lines)];

echo json_encode( array('line' => $random_poem_line) );