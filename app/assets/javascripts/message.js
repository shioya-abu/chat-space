$(function(){
  function buildHTML(message){
      var addImage = message.image ? message.image : "";
      var html = `<div class="message">
                    <div class="message__upper-info">
                      <p class="message__upper-info__talker">
                      ${message.user_name}
                      </p>
                      <p class="message__upper-info__date">
                      ${message.created_at}
                      </p>
                    </div>
                    <p class="message__text">
                    ${message.content}
                    </p>
                    <div>
                      <img src = '${addImage}'>
                    </div>
                  </div>`
      return html;
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $("form")[0].reset();
      $(".submit-btn").prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージ送信失敗!');
      $(".submit-btn").prop('disabled', false);
    })
  })
});