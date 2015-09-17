$(document).ready(function()
{
    $('#TXT_Hide').hide();
    $('#TXT_Name').focus();
    $('#TXT_Hide').fadeIn(1000);
    $('#BTN_Accept').click(function()
    {
        var value=$('#TXT_Name').val();
        $.ajax(
        {
            url:"http://bootcamp.aws.af.cm/welcome/"+value,
            dataType: 'json',
            success: function(data)
            {
                if (data.error){
                    $('#Response').text(data.error);
                    $('#Response').addClass('error');
                }
                else{
                    $('#Response').text(data.response);
                    $('#Response').removeClass('error');
                }
            },
            error: function(textStatus){
                $('#TXT_Error').text(textStatus);
                $('#TXT_Error').addClass('error');
            },
        });
        $('#TXT_Name').val('');
    });
    $('#BTN_Search').click(function()
    {
        var search=$('#TXT_Search').val();
        if (search=='')
        {
             $('#TXT_Error').text("First, enter an album");
             $('#TXT_Error').addClass('error');
        }
        else
        {
            $.ajax(
            {
                url: "https://api.spotify.com/v1/search",
                data: "q="+search+"&type=album",
                dataType: 'json',
                success: function(data)
                {
                    $('.albumnes').html('');
                    if (data.albums.total==0){
                        $('#TXT_Error').text("Artist not found :(");
                        $('#TXT_Error').addClass('error');
                    }
                    else
                    {
                        $('#TXT_Error').text('');
                        $('#TXT_Error').removeClass('error');
                        $.each(data.albums['items'], function(i)
                        {
                            var url_date=(data.albums['items'][i].href);
                            $.ajax(
                            {
                                url: url_date,
                                dataType: 'json',
                                success: function(data2)
                                {
                                    var album="<div class='cont_style'><img class='picture' src="+data.albums['items'][i]['images']['2'].url+">"
                                         +"<br"+"<p class='text_style'>"+data.albums['items'][i].type+"</p>"
                                         +"<p class='text_style'>"+data.albums['items'][i].name+"</p>"
                                         +"<p class='text_style'>"+data2.release_date+"</p>"
                                         +"<a class='link' href="+data.albums['items'][i].external_urls.spotify+">Go to album</a><br><br></div>";                                
                                         $('.albumnes').append(album);
                                },
                                error: function(textStatus)
                                {
                                    $('#TXT_Error').text(textStatus);
                                    $('#TXT_Error').addClass('error');
                                },
                            });
                        });
                    }
                },
                error: function(textStatus)
                {
                    $('#TXT_Error').text(textStatus);
                    $('#TXT_Error').addClass('error');
                },
            });
        }
        $('#TXT_Search').val('');
    });
});