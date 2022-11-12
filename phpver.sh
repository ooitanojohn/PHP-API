# phpのverをシンボリックリンクでデフォルト値の8.0.6、7.4.29と8.1.0で切り替えるスクリプト
# cd /mnt/c/xampp/
# ln -s apache/conf/extra/httpd-xampp_8.0.6.conf httpd-xampp.conf
# ln -s php_8.0.6/ php/
# faker ver 8.1を要求される unitは7.3,7.4

# 管理者でcmd開いて以下入力
# xamppはwinに入ってるからwinでシンボリックs作らないとだめ？ →　そうだね
del C:\xampp\apache\conf\extra\httpd-xampp.conf
rmdir C:\xampp\php
mklink C:\xampp\apache\conf\extra\httpd-xampp.conf C:\xampp\apache\conf\extra\httpd-xampp_8.0.6.conf
mklink /D C:\xampp\php C:\xampp\php_8.0.6

del C:\xampp\apache\conf\extra\httpd-xampp.conf
rmdir C:\xampp\php
mklink C:\xampp\apache\conf\extra\httpd-xampp.conf C:\xampp\apache\conf\extra\httpd-xampp_8.1.6.conf
mklink /D C:\xampp\php C:\xampp\php_8.1.6

del C:\xampp\apache\conf\extra\httpd-xampp.conf
rmdir C:\xampp\php
mklink C:\xampp\apache\conf\extra\httpd-xampp.conf C:\xampp\apache\conf\extra\httpd-xampp_7.4.29.conf
mklink /D C:\xampp\php C:\xampp\php_7.4.29
