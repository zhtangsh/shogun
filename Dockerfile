FROM 192.168.1.60:29006/tools/nginx:1.17.9

##工作目录
WORKDIR /var/static/dist

##拷贝nginx配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

##拷贝编译完成的dist文件
COPY dist/ /var/static/dist

##拷贝启动脚本
COPY entrypoint.sh /entrypoint.sh

##拷贝启动脚本
COPY env.template /var/static/dist/env.template

RUN chmod a+x /entrypoint.sh

ENV BACKEND_URL=http://192.168.14.79:8800

ENTRYPOINT ["/entrypoint.sh"]

##默认暴露80端口,如果nginxp配置端口修改这边也需要修改
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
