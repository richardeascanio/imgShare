$('#post-comment').hide();
$('#btn-toggle-comment').click(function(e) {
    e.preventDefault();
    $('#post-comment').slideToggle();
});
$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    $.post('/images/' + imgId + '/like')
        .done((data) => {
            console.log(data);
            $('.likes-count').text(data.likes);
        });
});
$('#btn-delete').click(function(e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Are you sure you want to delete this image?');
    if (response) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
        .done(function(result) {
            $this.text('');
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.append('<i class="fa fa-check""></i> <span>Deleted!</span>');
        })
    }
});