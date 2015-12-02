var processed = {},
  options = {
    debug: true,
    width: 250,
    height: 250
  };

// process images from json object using smartcrop()
$.getJSON('assets/images/images.json', function(images) {
  // append images from json obbject to bottom of body
  $('body').append("<h1>Image from JSON</h1>");
  $('body').append(images.map(function(image) {
    return $('<div>')
      .append($('<img>').attr('src', image.url));
  }));
  $('img').each(function() {
    $(this).load(function() {
      window.setTimeout(function() {
        var img = this;
        if (processed[img.src]) return;
        processed[img.src] = true;
        SmartCrop.crop(img, options, function(result) {
          var crop = result.topCrop,
            canvas = $('<canvas>')[0],
            ctx = canvas.getContext('2d');
          canvas.width = options.width;
          canvas.height = options.height;
          ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
          $(img)
            .after(canvas)
            .after(result.debugCanvas);
        });
      }.bind(this), 100);
    });
    if (this.complete)
      $(this).load();
  });

});

// process images from html with smartcrop()
$('img').each(function() {
  $(this).load(function() {
    window.setTimeout(function() {
      var img = this;
      if (processed[img.src]) return;
      processed[img.src] = true;
      SmartCrop.crop(img, options, function(result) {
        var crop = result.topCrop,
          canvas = $('<canvas>')[0],
          ctx = canvas.getContext('2d');
        canvas.width = options.width;
        canvas.height = options.height;
        ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
        $(img)
          .after(canvas)
          .after(result.debugCanvas);
      });
    }.bind(this), 100);
  });
  if (this.complete)
    $(this).load();
});