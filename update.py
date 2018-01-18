import os, time

while True:
    # run an update
    os.system("git pull")
    
    #change file locations
    DIR = os.curdir
    files = os.listdir(DIR)
    
    madeChanges = False
    
    for i in files:
        madeChanges = True
        if i[:-3]=="apk":
            print i, DIR+"/android/"+i
            #os.rename(i, DIR+"/android/"+i)
        else:
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

