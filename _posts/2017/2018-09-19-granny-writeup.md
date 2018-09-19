---
layout: post
title:	"Granny Writeup"
date:	2018-09-19 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - hackthebox
---
<head>
	<title> Granny Writeup | HackTheBox </title>
</head>

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/logo.png)

## i. Port Scan

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/ports.png)

## ii. Enumeration

Navigating to port 80:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/http.png)

Presented with an Under Construction page.

Running Nikto to enumerate the websoftware:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/nikto.png)

IIS 6 was shipped out with Windows 2003 R2 in 2005, which means it's over 13 years old. 
With software being that old, there's bound to be an exploit out there.

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/exploit.png)

Running the exploit in Metasploit:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/msf.png)

Awesome, we got a shell!

## iii. Privilege Escalation

We see that we are logged in as NT Authority\Network Service:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/whoami.png)

`Network Service` is a built-in account with reduced privileges.

~~~
https://serverfault.com/questions/217654/difference-between-nt-authority-network-service-and-nt-authority-system
~~~

Metasploit has a local exploit suggester module you can run to see what the machine might be vulnerable to:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/suggester.png)

Going to attempt the last one, `ppr_flatten_rec`

To do so, first need to background the session. Then setup the options for the exploit:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/session.png)

~~~
$ background # backgrounds session
$ sessions  # shows available sessions
$ set SESSION #
~~~

Once the options are setup, run the exploit:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/error.png)

`RequestError stdapi_sys_config_getsid`

Strange error...

The error can be fixed by migrating the process.

First switch back to the session, and run `ps` to see available processes:

![Screenshot]({{ site.baseurl }}/images/posts/2017/granny/processes.png)

















~~~
Sources / Links:
[0]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[1]: https://www.asterisk.org/
~~~

