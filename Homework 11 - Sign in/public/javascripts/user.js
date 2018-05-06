(function() {
    $(function() {
        $("[name='logout']").click(logout);
    });
    
    function logout() {
        window.location.href = "/logout";
    }
})();
