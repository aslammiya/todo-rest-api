echo "BUILD START"
# python3 -m venv ./env
# source ./env/bin/activate
pip install -r requirements.txt

# Run migrations (optional, depending on the project)
# python manage.py migrate

# Collect static files (optional, if you have static files)
python manage.py collectstatic --noinput
echo "BUILD END"