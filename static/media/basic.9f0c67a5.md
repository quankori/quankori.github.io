# Ansible Basic

- Variable

```yml
- name: Print car's information
  hosts: localhost
  vars:
    car_model: "BMW M3"
    country_name: USA
    title: "Systems Engineer"
  tasks:
    - name: Print my car model
      command: echo "My car's model is {{ car_model }}"

    - name: Print my country
      command: echo "I live in the {‌{ country_name }}"
```

- Condition

```yml
- name: Toi da tot nghiep chưa
  hosts: localhost
  vars:
    age: 25
  tasks:
    - command: echo "Toi chua tot nghiep"
      when: age < 22
    - command: echo "Toi da tot nghiep"
      when: age >= 22
```

- Register

Register giúp nhận kết quả trả về từ một câu lệnh. Sau đó ta có thể dùng kết quá trả về đó cho những câu lệnh chạy sau đó.

```yml
- name: Check status of service and email if its down
  hosts: localhost
  tasks:
    - command: service httpd status
      register: command_output

    - mail:
        to: Admins
        subject: Service Alert
        body: "Service is down"
      when: command_output.stdout.find("down") != -1
```

- Loop

```yml
- name: Install packages
  hosts: localhost
  tasks:
    - name: Install all service
      yum: name="{{ item }}" state=present
      with_items:
        - httpd
        - mysql
        - php
```

- Roles

```yml
- name: Set firewall configurations
  hosts: web
  vars:
    http_port: 8081
    snmp_port: 160-161
    inter_ip_range: 192.0.2.0
  tasks:
    - firewalld:
        service: https
        permanent: true
        state: enabled
    - firewalld:
        port: "{{ http_port }}"/tcp
        permanent: true
        state: disabled
    - firewalld:
        port: "{{ snmp_port }}"/udp
        permanent: true
        state: disabled
    - firewalld:
        source: "{{ inter_ip_range }}"/24
        zone: internal
        state: enabled
```
