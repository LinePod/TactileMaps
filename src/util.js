function getTextForFeature(feature) {
  if(typeof(feature.properties.name) == 'string') {
    return feature.properties.name
  }
  //TODO determine most descriptive property
  return "" //feature.properties[Object.keys(feature.properties)[0]]
}

function attachSpeechToFeature(ctx, feature) {
  var text = getTextForFeature(feature);
  //console.log(feature.properties);
  if(text) {
    ctx.__currentElement.addEventListener("mouseenter", function(){console.log("speak");console.log(text);speak(text)});
    ctx.__currentElement.addEventListener("mouseleave", function(){cancelSpeech()});
  }
}
