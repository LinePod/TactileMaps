function speak(text) {
  var msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.0;
  window.speechSynthesis.speak(msg);
}

function cancelSpeech() {
  window.speechSynthesis.cancel();
}
