<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="puzzle.js" defer id="script" contextPath="${pageContext.request.contextPath}"></script>
</head>
<body>
    <form action="${pageContext.request.contextPath}/login" method="POST">
    <label>
        <input type="text" name="username" placeholder="username.."/>
    </label><br>
    <label>
        <input type="text" name="password" placeholder="password.."/>
    </label><br>
        <input type="submit" value="Log in" id="login"/>
    </form>
</body>
</html>

