cat ../../DB/DBDump.sql | docker exec -i mysql_app /usr/bin/mysql -u root --password=yourpassword mydatabase
