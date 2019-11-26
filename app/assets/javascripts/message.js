$(function(){

  var reloadMessages = function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {:format=>"json"}'
      last_message_id = $(".message").last().data('message-id')
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(){
        alert('メッセージ更新失敗!');
      });
    };
  };

  function buildHTML(message){
      var addImage = message.image ? message.image : "";
      var html = `<div class="message" data-message-id="${message.id}">
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
  setInterval(reloadMessages, 7000);
});