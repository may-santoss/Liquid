(function() {
  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      window.setTimeout(function() {
        checkReady(callback);
      }, 100);
    }
  };
  var runCode = function($) { 
    var phone_checbox=`<div style="margin-left:6px;padding-top:6px;" class="checkbox-wrapper">
    <div class="checkbox__input">
      <input name="checkout[phone_accept]" type="hidden" value="0"><input class="input-checkbox" data-backup="phone_accept" type="checkbox" value="1" checked="checked" name="checkout[attributes][phone_accept]" id="checkout_buyer_phone_accept">
    </div>
    <label class="checkbox__label" for="checkout_buyer_phone_accept">
      Keep me up to date on news and exclusive offers
  </label></div>`;
  $(phone_checbox).insertAfter('.address-fields').children().last();

    $('.checkout_login_popup').click(function(){
      $('.login_form').toggleClass('is-hidden');
    });
    if(Shopify.Checkout.page=="thank_you"){
      if(sessionStorage.getItem("reff_discount")=="true"){
        sessionStorage.removeItem('reff_discount');
      }
    }
    
      $('#qr_credit_enable').on('change', function() {
        if($("#qr_credit_enable").is(":checked")){
        $(this).attr("disabled", true);
        $("#qr_credit_enable").before('<span class="myloader loader"></span> ');
          var qrcheckout_token=$(this).attr('data-checkout');
          var user_id=$(this).attr('data-checkout');
          var Data = {
              'shopify_user_id':__st.cid,
              'qrcheckout_token':qrcheckout_token,
          };
          $.ajax({
              url: "https://larroude.com/a/s/users/apply_credit",
              type: "post",
              dataType : "json",
              data: Data,
              success: function(data) {
                if(data.status=="success"){
                window.location.reload();
                }else{
                  alert(data.message);
                  $("#qr_credit_enable").attr("disabled", false);
                  $("#qr_credit_enable").prop('checked', false);
                  $('span.myloader').remove();
                }
              }
          });
        }
        else {
          var qrcheckout_token=$("#qr_credit_enable").attr('data-checkout');
          $("#qr_credit_enable").attr("disabled", true);
          $("#qr_credit_enable").before('<span class="myloader loader"></span> ');
          var Data = {
              'shopify_user_id':__st.cid,
              'qrcheckout_token':qrcheckout_token,
          };
          $.ajax({
              url: "https://larroude.com/a/s/users/remove_credit",
              type: "post",
              dataType : "json",
              data: Data,
              success: function(data) {
                if(data.status=="success"){
          
                window.location.reload();
                }
                else {
                  $("#qr_credit_enable").attr("disabled", false);
                  $('span.myloader').remove();
                }
              }
          });
        }
  });
    
  if(__st.cid != null){
    var Data = {
      'shopify_user_id':__st.cid
    };
    $.ajax({
      url: "https://larroude.com/a/s/users/all_credits",
        type: "post",
        dataType : "json",
        data: Data,
        success: function(data) {
            var credit='$ '+data.amount;
            $('.qr_credit_amount').html(credit);
          // $("#available_credit_amount").val(data.amount);
        }
    });
  }
};

if (typeof jQuery == "undefined") {
      var script = document.createElement("SCRIPT");
      script.src =
          'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
      script.type = 'text/javascript';
      document.getElementsByTagName("head")[0].appendChild(script);
      checkReady(function($) {
          runCode($);
      });
  } else {
      runCode(jQuery);
  }
})();