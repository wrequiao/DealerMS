cd android
rd /s /q app\build
rd /s /q build

rd /s /q app\src\main\res\drawable-hdpi
rd /s /q app\src\main\res\drawable-ldpi
rd /s /q app\src\main\res\drawable-mdpi
rd /s /q app\src\main\res\drawable-xhdpi
rd /s /q app\src\main\res\drawable-xxhdpi
rd /s /q app\src\main\res\drawable-xxxhdpi

del /f /q app\src\main\res\raw\*
del /f /q app\src\main\assets\*.bundle
.\gradlew clean && cd ..  && cd .\android && .\gradlew assembleRelease && explorer.exe app\build\outputs\apk\release   && pause
