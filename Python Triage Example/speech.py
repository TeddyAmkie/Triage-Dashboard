import speech_recognition as sr

"""
triageStatus = " "
yesSynonyms = ["yes", "yeah", "yea", "Affirmitive"]
noSynonyms = ["no", "nope", "negative"]
overrideCommand = ["skip", "overide"]
"""

def outputSpeechToText():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        # print("Speak answer: ")
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source, timeout = 3)

        with open("microphone-results.wav", "wb") as f:
            f.write(audio.get_wav_data())

        try:
            text = r.recognize_google(audio)
            return text
        except:
            return "PLEASE SPEAK AGAIN!"
