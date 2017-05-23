function attachSpeechToFeature(ctx, feature) {
  var text = feature.properties.name;
  if(text) {
    ctx.__currentElement.addEventListener("mouseenter", function(){speak(text)});
    //ctx.__currentElement.addEventListener("mouseleave", function(){cancelSpeech()});
  }
}
