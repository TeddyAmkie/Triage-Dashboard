import speech

yesSynonyms = ["yes", "yeah", "yea", "Affirmitive"]
noSynonyms = ["no", "nope", "negative"]

class Victim:

    triageStatus = " "

    ableToWalk = False
    spotaneousBreathing = False
    respiratoryAboveThrity = False
    perfusion = False
    mentalStatus = False

    def __init__(self):
        pass

def createVictim():

    output = Victim()

    print("Is the victim able to walk?")
    walk = speech.outputSpeechToText()
    while True:
        if (walk in yesSynonyms):
            output.triageStatus = "GREEN - MINOR"
            return output
        elif (walk in noSynonyms):
            break
        else:
            print("Please try again")

    print("Is the victim spontaneously breathing?")
    breathing = speech.outputSpeechToText()
    while True:
        if (breathing in yesSynonyms):
            output.spotaneousBreathing = True
            break
        elif (breathing in noSynonyms):
            print("Were you able to position the victim's airway?")
            airway = speech.outputSpeechToText()
            if (airway in yesSynonyms):
                output.triageStatus = "RED - IMMEDIATE"
                return output
            else:
                output.triageStatus = "BLACK - EXPECTANT"
                return output
            break
        else:
            print("Please try again")

    print("Is the respiratory rate above 30?")
    repAbove30 = speech.outputSpeechToText()
    while True:
        if (repAbove30 in yesSynonyms):
            output.respiratoryAboveThrity = True
            output.triageStatus = "RED - IMMEDIATE"
            return output
        elif (repAbove30 in noSynonyms):
            output.respiratoryAboveThrity = False
            break
        else:
            print("Please try again")

    print("Is there perfusion?")
    perfusion = speech.outputSpeechToText()
    while True:
        if (perfusion in noSynonyms):
            output.triageStatus = "RED - IMMEDIATE"
            return output
        elif (perfusion in yesSynonyms):
            output.perfusion = True
            break
        else:
            print("Please try again")

    print("How is their mental status?")
    mental = outputSpeechToText()
    while True:
        if (mental in noSynonyms):
            output.mentalStatus = False
            output.triageStatus = "RED - IMMEDIATE"
            return output
        elif (mental in yesSynonyms):
            output.mentalStatus = True
            output.triageStatus = "YELLOW - DELAYED"
            return output
        else:
            print("Please try again")

createVictim()
