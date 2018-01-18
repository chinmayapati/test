import os, time

while True:
    # run an update
    os.system("git pull")
    
    #change file locations
    DIR = os.curdir
    files = os.listdir(DIR)
    
    madeChanges = False
    
    for i in files:
        if i[-3:]=="apk":
            madeChanges = True
            os.rename(i, DIR+"/android/"+i)
        elif i[-3:] in ["KAR","ipa"]:
            madeChanges = True
            os.rename(i, DIR+"/ios/"+i)
    
    if madeChanges:
        print "\n","="*15,"\nFound some changes! :(\n"
        os.system("git add .")
        os.system('git commit -m "Added files to specified directory"')
        os.system("git push")
    else:
        print "\nNo new changes :)\n"
        
    time.sleep(5)