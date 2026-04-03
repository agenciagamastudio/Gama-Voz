@echo off
REM Gama Voz Launcher
REM Run Streamlit app and open browser

cd /d "C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_VOZ_V2"

REM Activate venv
call venv_new\Scripts\activate.bat

REM Start Streamlit with empty input for telemetry
echo. | streamlit run app.py --server.port=8503 --logger.level=error

pause
