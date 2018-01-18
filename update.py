import os, time

while True:
    # run an update
    os.system("git pull")
    
    #change file locations
    DIR = os.curdir
    files = os.listdir(DIR)
    
    madeChanges = False
    
    for i in files:
        if i[:-3]=="apk":
            madeChanges = True
            print i, DIR+"/android/"+i
            #os.rename(i, DIR+"/android/"+i)
        elif i[:-3] in ["KAR","ipa"]:
            madeChanges = True
            print i, DIR+"/ios/"+i
            #os.rename(i, DIR+"/ios/"+i)
    
    if madeChanges:
        print "\n\nFound some changes!"
        os.system("git add .")
        os.system("git commit -m \"Added to specified directory\"")
        os.system("git push")
    else:
        print "\n\nNo new changes :)"
        
    time.sleep(5)

