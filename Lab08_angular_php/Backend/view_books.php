<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

use JetBrains\PhpStorm\Pure;

include 'database-connection.php';

$countQuery = "";
$selectQuery = "";
$finalHtml = "";

$viewGrouped = file_get_contents("php://input");

if($viewGrouped == 1) {
    //FIXME should be a grouped by title,author, but this meant changing the data in order to make it noticeable
    $countQuery = "SELECT COUNT(*) FROM books WHERE author='aa'";
    $selectQuery = "SELECT * FROM books WHERE author='aa'";
}else{
    $countQuery = "SELECT COUNT(*) FROM books";
    $selectQuery = "SELECT * FROM books";
}

function populateRow($row){
    global $finalHtml;
    $finalHtml .= "<p>";
    $finalHtml .= "author: " . $row['author'];
    $finalHtml .= "<br>";
    $finalHtml .= "title: " . $row['title'];
    $finalHtml .= "<br>";
    $finalHtml .= "comment: " . $row['comment'];
    $finalHtml .= "<br>";
    $finalHtml .= "date: " . $row['date'];
    $finalHtml .= "<p>";
}

#[Pure] function getCurrentPage($totalPages): int
{
    if (isset($_GET['currentpage']) && is_numeric($_GET['currentpage'])){
        $currentPage = (int) $_GET['currentpage'];
    }else{
        $currentPage = 1;
    }

    if ($currentPage > $totalPages){
        $currentPage = $totalPages;
    }
    if ($currentPage < 1){
        $currentPage = 1;
    }

    return $currentPage;
}


function showLinksInRange($currentPage, $totalPages, $range){
  global $finalHtml;
    for ($x = ($currentPage - $range); $x < (($currentPage + $range) + 1); $x++) {
        // it's a valid page number...
        if (($x > 0) && ($x <= $totalPages)) {
            // on current page...
            if ($x == $currentPage) {
                // 'highlight' it but don't make a link
                $finalHtml .= " [<a>$x</a>] ";
                // if not current page...
            } else {
                // make it a link
                $finalHtml .= " <a href='{$_SERVER['PHP_SELF']}?currentpage=$x'>$x</a> ";
            }
        }
    }
}

function skipBackwardLinksForFirstPage($currentPage){
  global $finalHtml;
    if ($currentPage > 1) {
        // show << link to go back to page 1
        $finalHtml .= " <a href='{$_SERVER['PHP_SELF']}?currentpage=1'><<</a> ";
        // get previous page num
        $previousPage = $currentPage - 1;
        // show < link to go back to 1 page
        $finalHtml .= " <a href='{$_SERVER['PHP_SELF']}?currentpage=$previousPage'><</a> ";
    } // end if
}


function skipForwardLinksForLastPage($currentPage, $totalPages){
  global $finalHtml;
    // if not on last page, show forward and last page links
    if ($currentPage != $totalPages) {
        // get next page
        $nextPage = $currentPage + 1;
        // $finalHtml += forward link for next page
        $finalHtml .= " <a href='{$_SERVER['PHP_SELF']}?currentpage=$nextPage'>></a> ";
        // $finalHtml += forward link for last page
        $finalHtml .= " <a href='{$_SERVER['PHP_SELF']}?currentpage=$totalPages'>>></a> ";
    }
}

    global $conn;
    global $selectQuery, $countQuery;

    $countAllQuery = $countQuery;
    $countAllMysqliResult = mysqli_query($conn, $countAllQuery);
    $countAllResult = mysqli_fetch_row($countAllMysqliResult);
    $numberOfBookRecords = $countAllResult[0];

    $booksPerPage = 4;
    $totalPages = ceil($numberOfBookRecords/$booksPerPage);

    $currentPage = getCurrentPage($totalPages);  // get the current page

    $offset = ($currentPage - 1) * $booksPerPage;

    $selectBooksQuery = $selectQuery . " LIMIT $offset,$booksPerPage";
    $selectBooksMysqliResult = mysqli_query($conn, $selectBooksQuery);

    if (mysqli_num_rows($selectBooksMysqliResult) > 0){
        while ($row = mysqli_fetch_assoc($selectBooksMysqliResult)){
           populateRow($row);
        }
    }else{
        $finalHtml = "There are no books";
    }

    $rangeToShowLinks = 2;

    skipBackwardLinksForFirstPage($currentPage);

    showLinksInRange($currentPage, $totalPages, $rangeToShowLinks);

    skipForwardLinksForLastPage($currentPage, $totalPages);

    echo json_encode($finalHtml);
//    echo json_encode($viewGrouped);
