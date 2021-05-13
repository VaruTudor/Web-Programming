<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    if ((Integer) session.getAttribute("userId") == 0){
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
%>
<html>
<head>
    <title>Puzzle</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="puzzle.js" defer id="script" contextPath="${pageContext.request.contextPath}"></script>
</head>
<body>
<nav>
    <form action="${pageContext.request.contextPath}/puzzle" method="get">
        <input type="submit" value="Continue the puzzle" id="continue"/>
    </form>
    <form action="${pageContext.request.contextPath}/puzzle" method="post">
        <input type="submit" value="Reset puzzle" id="reset"/>
    </form>
</nav>
</body>
</html>

