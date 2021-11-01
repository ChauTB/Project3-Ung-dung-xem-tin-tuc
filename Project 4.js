const endpoint = 'https://gnews.io/api/v4/search?q=example&token=4ed032612a462520e7a299e943abaf07';
const div = document.getElementById('tintuc')
let a;
fetch(endpoint)
    .then(function (response) {
        return response.json();
    })//hàm thêm tin tức vào trang
    .then(function (data) {
        $('div').removeClass('preloading');
        $('.load').delay(1000).fadeOut('fast');
        a = data.articles;
        var html = '';
        a.forEach(function (value, index) {
            html += '<div class="bangtin">';
            html += '<a href="#"><image class="trai" src="' + value.image + '"></a>';
            html += '<div class="phai">'
            html += '<h3><a href="' + value.url + '" target="_blank">' + value.title + '</a></h3>';
            html += '<i>' + value.publishedAt + '</i>';
            html += '<p>' + value.content + '</p>';
            html += '</div>';
            html += '</div>';
        });
        $('#tintuc').html(html);
    });
window.onload = function () {
    /* lấy phần tử modal */
    var modal = document.getElementById("myModal");
    /* thiết lập nút mở modal */
    var c = document.getElementById("myBtn");
    /* thiết lập nút đóng modal */
    var span = document.getElementsByClassName("close")[0];

    /* Sẽ hiển thị modal khi người dùng click vào */
    c.onclick = function () {
        modal.style.display = "block";
    }
    /* Sẽ đóng modal khi nhấn dấu x */
    span.onclick = function () {
        modal.style.display = "none";
        $('.tim').val('');
    }

    /*Sẽ đóng modal khi nhấp ra ngoài màn hình*/
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
$(document).on('click', '.close1', function () {
    $('.load').fadeIn('fast');
    var tim = $('.tim').val();
    var theloai = $('select').val();
    var search = '';
    if (tim != '' && theloai != '') { search = theloai + ' ' + tim; }
    else if (theloai == '' && tim != '') { search = tim; }
    else { search = theloai; }
    fetch('https://gnews.io/api/v4/search?q=' + search + '&token=4ed032612a462520e7a299e943abaf07&lang=en')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('.load').delay(1000).fadeOut('fast');
            a = data.articles;
            var html = '';
            a.forEach(function (value, index) {
                html += '<div class="bangtin">';
                html += '<a href="#"><image class="trai" src="' + value.image + '"></a>';
                html += '<div class="phai">'
                html += '<h3><a href="' + value.url + '" target="_blank">' + value.title + '</a></h3>';
                html += '<i>' + value.publishedAt + '</i>';
                html += '<p>' + value.content + '</p>';
                html += '</div>';
                html += '</div>';
            });
            $('#tintuc').html(html);
            $('.tim').val('');
            $('select').val('');
            document.getElementById("myModal").style.display = "none";

        });
});