# JobNinja
Group Members: Nick Lang, Josiah Moye, Steven Adams

JobNinja matches users to companies based off of complementary personalities. Users take a personality test, and then enter url's to pages that are reflective of the tenor of a company. This url could be a company's about page or link to a job description. A list of words is generated for both the user's personality, and the company's description. WordNet is then used, through a python script on the server, to parse a similarity rating between the user and company.

## This project can be found running at:
* http://www.nicklang.io:8080/JobNinja/
* http://josiahmoye.com:8080/JobNinja/
* http://stevenadams.info:8080/JobNinja/

## Technologies
Java, Spring REST, MySQL, AngularJS, HTML5/CSS3, Python, NLTK

## API's
* https://www.traitify.com/
* https://www.meaningcloud.com/

## Future Goals
* There is always room to refactor code, making it more concise and modular.
* With user feedback we could use a supervised learning model to more accuratly predict satisfaction with a company.
