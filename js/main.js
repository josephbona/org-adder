jQuery(document).ready(function($) {
  // your org here
  var organization = 'fsa-alumni'

  // https://developer.github.com/v3/orgs/members/#add-or-update-organization-membership
  function submitForm(organization, username) {
    hideMessage();
    $.ajax({
      url: 'https://api.github.com/orgs/' + organization + '/memberships/' + username,
      type: 'PUT',
    })
    .done(function(response) {
      console.log(response);
      showMessage(JSON.stringify(response), 'success');
    })
    .fail(function(response) {
      console.log(response);
      showMessage(JSON.stringify(response), 'error');
    })
    .always(function() {
      $('#add-form [name="username"]').val('');
    });
  }

  function showMessage(message, status) {
    $('.message').html('<pre><code>' + message + '</code></pre>').addClass(status).show();
  }

  function hideMessage() {
    $('.message').hide().html('').attr('class', 'message');
  }

  $('#add-form').submit(function(event) {
    event.preventDefault();
    var username = $('#add-form [name="username"]').val();
    submitForm(organization, username);
  });

  $('#auth-button').click(function() {
    // Do some authentication
    $(this).html('Authenticated as @adminuser').addClass('authenticated');
  })

});