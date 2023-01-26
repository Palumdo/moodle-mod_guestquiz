# Guest Quiz #

Guest Quiz is used to allow guest student to make simple and light quiz without account in an Open Moodle

## License ##

2023 UCLouvain

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.

//Question1
::Q1:: 1+1=2 {T}

::Q1a:: 1+2=<span style="font-size:1.5em">2</span> {F}

::Q2:: What's <b style="color:red;">between</b> orange and green in the spectrum?
{ =yellow # right; good! 
  ~<i>red</i> # wrong, it's yellow 
  ~blue # wrong, it's yellow,~taupe
  #### Global feedback }

::Q2a:: Quel est le remede pour l'intervention chirurgicale ?
{ =Arnica # Super Bravo!
  ~Brillonia # wrong, C'est Arnica 
  ~<u>Nux vomica</u> # Presque mais non
  #### A R N I C A}

::Q3:: Two plus {=two
                 =2 
                 =deux
                 #### 2 dans toutes les langues} equals four.

/*
::Q4:: Which animal eats which food? { =cat -> cat food =dog -> dog food }
*/
::Q5:: What is a number from 1 to 5? {#3:2}

::Q6:: Two times two equals {~%50%4#Good~%0%5 
                             ~%50%four#Good 
                             ~six 
                             ~%-100%1000
                             ####Global feedback}

::Q7:: When was Ulysses S. Grant born? {#
  =1822:0      # Correct! Full credit.
  =%50%1822:2  # He was born in 1822. Half credit for being close.
  ####Global feedback
}
/*
::Q8:: How are you?
{}

How are you without title ?
{}
*/

// question: 0  name: Switch category to $course$/top/Défaut pour Louv23x/Module 2
$CATEGORY: $course$/top/Défaut pour Louv23x/Module 2


// question: 608895  name: S1Q6


// question: 643995  name: Cert1
::Cert1::[html]<p dir\="ltr" style\="text-align\: left;">Comment déterminer qu’un article soit passé par un processus de peer-review avant sa publication ?<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Identifier si un DOI est présent dans les informations bibliographiques de l’article.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Analyser la politique de sélection des textes de la revue dans laquelle l’article est paru.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Vérifier que l’article a bien été publié au format électronique.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Se renseigner sur le parcours académique et professionnel de l’auteur.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Le peer-review (ou évaluation par les pairs) est une activité collective des chercheurs d’évaluation des travaux d’autres chercheurs. Ce processus est mis en place par les revues scientifiques. Un article proposé est soumis à la relecture critique d’un comité d’experts du domaine en vue de sa validation pour publication. Une revue qui met en place ce processus de validation du contenu par un peer-review, le signalera toujours dans sa politique de sélection des textes et parfois, sur sa page d'informations générales.<br></p>
}


// question: 644018  name: Cert10
::Cert10::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation <strong>incorrecte</strong> \:<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Identifier le type de document consulté est une tâche plus ardue depuis le développement des documents électroniques.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">La bibliothèque propose des outils de recherche d’informations en ligne permettant de trouver spécifiquement de la littérature scientifique.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Tout internaute qui publie du contenu sur internet peut être qualifié d'auteur et les droits liés à ce contenu lui sont automatiquement accordés.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Toute personne qui publie du contenu sur le web, quel que soit le biais (site internet, wiki, blog, réseau social,...), peut s'en déclarer l'auteur. Certaines responsabilités en rapport à ce contenu lui seront assignées; cependant, les droits d'auteur ne lui seront pas toujours concédés. En effet, plusieurs canaux se réservent les droits du contenu publié sur le web via leurs services.<br></p>
}


// question: 644019  name: Cert11
::Cert11::[html]<p dir\="ltr" style\="text-align\: left;">Laquelle de ces équations de recherche aboutira au plus grand nombre de résultats ?<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">« inégalités scolaires » ET socialisation<br></p>
	=<p dir\="ltr" style\="text-align\: left;">inégalité ET scolaire OU social*<br></p>
	~<p dir\="ltr" style\="text-align\: left;">« inégalités scolaires » OU social*<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Les guillemets « » permettent de rechercher une expression exacte, ce qui limitent le nombre de résultats à ceux reprenant l'expression en tant que tel dans leur contenu. L’opérateur booléen ET, permet de lancer une recherche où tous les termes seront présents dans les résultats, ces termes peuvent cependant être présents de part et d’autre du texte. L'opérateur OU permet de rechercher la présence de l'un ou l'autre terme dans le contenu, ce qui élargit la recherche et donc le nombre de résultats obtenus. L’astérisque * permet de rechercher simultanément tous les mots commençant par le même radical (social), soit ici, social, sociale, socialisation,…<br><br>Parmi les proposition énoncées, inégalité ET scolaire ou social* est celle qui ouvre davantage les possibilités de recherche et ce pour plusieurs raisons \: <br>- elle ne se limite pas à rechercher une expression exacte contrairement aux deux autres propositions ;<br>- elle utilise l'opérateur OU pour ouvrir la recherche de résultats à ceux qui concernent d'une part, les inégalités scolaires et d'autre part, à ceux qui reprennent un ou plusieurs mots issus du radical social ;<br>- l'utilisation de l'astérisque permet de rechercher des résultats qui comprennent tous les termes composés du radical social.<br></p>
}


// question: 644020  name: Cert12
::Cert12::[html]<p dir\="ltr" style\="text-align\: left;">Que faire si vous êtes confronté à du bruit documentaire ?<br></p>{
	=<p dir\="ltr" style\="text-align\: left;">Trier les résultats en utilisant les filtres mis à disposition par les outils de recherche documentaire.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Supprimer les opérateurs booléens de votre requête initiale.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Prendre le temps de vérifier la pertinence de chaque document et trier manuellement l’ensemble des résultats obtenus.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">On parle de bruit documentaire quand on est confronté à trop de résultats non pertinents par rapport à la requête initiale. Afin de limiter le bruit documentaire, il est nécessaire de bien délimiter son sujet, de sélectionner les bons mots-clés en utilisant le vocabulaire adéquat (avec l'aide du thésaurus, si celui-ci est disponible), d’utiliser des opérateurs booléens, de trier les résultats obtenus à l’aide des filtres. Soit, en appliquant rigoureusement chaque étape de la méthode de recherche documentaire. <br></p>
}


// question: 643997  name: Cert2
::Cert2::[html]<p dir\="ltr" style\="text-align\: left;">L’élément de troncature astérisque * permet \: <br></p>{
	~<p dir\="ltr" style\="text-align\: left;">uniquement d’effectuer une recherche sur la base simultanée d’un terme au singulier et au pluriel.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">d’effectuer une recherche à partir de tous les termes issus d’un même radical.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">d’effectuer une recherche à partir d’un terme ainsi que de tous ses synonymes.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">L’astérisque * permet de rechercher simultanément des mots qui ont le même radical. Par exemple, soci* permet de rechercher des résultats reprenant, entre autres, les termes \: société, social, sociale, socialisation, sociétal...<br></p>
}


// question: 644010  name: Cert4
::Cert4::[html]<p dir\="ltr" style\="text-align\: left;">Dans le cadre d’un travail sur les dépenses des ménages en Belgique, \nvous utilisez le diagramme de répartition des dépenses des ménages \nbelges (2016), reproduit ci-dessous et disponible sur le site statbel <a href\="https\://statbel.fgov.be/fr/themes/menages/budget-des-menages\#figures" target\="_blank">à cette adresse</a>.</p><p dir\="ltr" style\="text-align\: left;"><img src\="@@PLUGINFILE@@/Depenses_menages_belges_2016.png" alt\="Répartition des dépenses des ménages belges (2016)" class\="img-responsive atto_image_button_text-bottom" width\="661" height\="472"><br></p><p dir\="ltr" style\="text-align\: left;">Dans ce contexte, ce document peut être catégorisé comme étant \:<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Un travail<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Une source<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Le diagramme proposé par statbel met en forme des données collectées par cet organisme dans le cadre d’une enquête. Ces données n’ayant pas encore fait l’objet d’une analyse, il s’agit d’une source. <br></p>
}


// question: 644011  name: Cert5
::Cert5::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation<strong> incorrecte.</strong><br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Le peer-review est une activité collective de validation du contenu.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Toute contribution d’un chercheur académique peut être qualifiée de document scientifique.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un document scientifique peut être pris en charge à la fois par un éditeur commercial et par un éditeur scientifique.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Un chercheur académique ne réalise pas que des documents scientifiques. Il propose parfois des productions qui ont une visée plus large que la communauté scientifique, comme par exemple, des articles ou des livres de vulgarisation, qui ne peuvent être considérés comme des documents scientifiques.<br></p>
}


// question: 644012  name: Cert6
::Cert6::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation <strong>incorrecte.</strong><br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Les informations bibliographiques à intégrer dans les références d’une bibliographie ne seront pas identiques d’un type de document à l’autre (exemple \: un article électronique et un rapport électronique).<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Les documents officiels (exemple \: une publication du SPF Finances) sont des documents conventionnels.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un article de presse rédigé sur base d’une recherche scientifique ne peut pas être considéré comme un document scientifique.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Les documents officiels ne sont pas pris en charge par un éditeur, ce sont les organismes eux-mêmes qui s’occupent de la diffusion de leurs publications. Ces documents sont non-conventionnels.<br></p>
}


// question: 644013  name: Cert7
::Cert7::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation <strong>incorrecte</strong><br></p>{
	=<p dir\="ltr" style\="text-align\: left;">&nbsp;La méthode de recherche documentaire comporte plusieurs étapes dont l’enchaînement n’est pas important.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">La méthode de recherche documentaire est un procédé renouvelable jusqu’à ce que les résultats obtenus soient en adéquation avec les besoins d’information.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">La méthode de recherche documentaire implique d’apprendre à maîtriser les fonctionnalités des outils.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">La méthode de recherche documentaire est composée de six étapes dont l’enchaînement est extrêmement important. L’aboutissement d’une étape et les résultats qui en découlent influent sur le déroulement de l’étape suivante. <br></p>
}


// question: 644015  name: Cert8
::Cert8::[html]<p dir\="ltr" style\="text-align\: left;">Parmi ces propositions, lesquelles sont des documents ? <br></p><p dir\="ltr" style\="text-align\: left;">(vous pouvez choisir plusieurs propositions) <br></p>{
	~%20%<p dir\="ltr" style\="text-align\: left;">Film<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Données primaires<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Évènement<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Connaissances<br></p>
	~%20%<p dir\="ltr" style\="text-align\: left;">Rapport de statistiques<br></p>
	~%20%<p dir\="ltr" style\="text-align\: left;">Roman<br></p>
	~%20%<p dir\="ltr" style\="text-align\: left;">Article<br></p>
	~%20%<p dir\="ltr" style\="text-align\: left;">Photo<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Un document est un objet de tous types, support d’informations, créé et reconnu comme tel. Les propositions \: film, roman, photo, rapport de statistiques et article sont des documents. Connaissances, données primaires et évènement sont par contre, des informations.<br></p>
}


// question: 644017  name: Cert9
::Cert9::[html]<p dir\="ltr" style\="text-align\: left;">Le thésaurus est \:<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">La liste des mots-clés qui ne sont pas acceptés par un outil de recherche documentaire.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un dictionnaire propre à chaque outil de recherche documentaire.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Une liste de mots-clés indexés par un outil de recherche documentaire.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Un thésaurus répertorie tous les mots-clés indexés et reconnus par un outil de recherche documentaire. Utilisez un thésaurus permet d’employer un vocabulaire adapté et de s’assurer d’obtenir des résultats suite à une requête documentaire. Notez cependant que tous les outils documentaires ne disposent pas d'un thésaurus.<br></p>
}


// question: 608888  name: S1Q1
::S1Q1::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation incorrecte \:<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Le document remplit une double fonction de communication et de mémoire.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Les premiers documents sont nés à la suite de l’apparition de l’écriture.<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Les types de document se sont démultipliés au cours du temps en lien avec les évolutions technologiques de la société.<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Le document est en effet un outil qui remplit une double fonction \: il permet aux êtres humains de communiquer entre eux en dehors des contraintes de temps et d’espace, ainsi que de conserver des informations à travers les âges. Les types de documents se sont également bel et bien démultipliés au fil des évolutions technologiques. Mais les premiers documents ne sont pas nés à la suite de l'apparition de l'écriture, bien que celle-ci constitue une mutation décisive de la communication de l'information. Déjà à la préhistoire, les hommes communiquaient à l'aide de supports matériels tels que des objets, des images ou des signes peints sur les murs des grottes.<br></p>
}


// question: 608890  name: S1Q2
::S1Q2::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation incorrecte \:<br></p>{
	~<p dir\="ltr" style\="text-align\: left;">Les évolutions technologiques des derniers siècles (télégraphe, téléphone, radio, télévision…) ont permis une démultiplication des médias d’information.<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Tout un chacun peut publier du contenu sur Internet, il détient automatiquement des droits sur celui-ci, peu importe l’application utilisée.<br></p>
	~L’identification des types de documents électroniques peut être compliquée, les formes sont parfois floues et de nouveaux supports d’information apparaissent de manière régulière.
	####<p dir\="ltr" style\="text-align\: left;">Les moyens de diffusion de l'information se sont en effet démultipliés suite aux diverses évolutions technologiques des derniers siècles. Cette multiplication des supports a d'ailleurs résolument complexifié l'identification des types de documents électroniques.<br>Enfin, si tout un chacun peut publier du contenu sur Internet, ce n'est pas pour autant qu'il en détient automatiquement des droits \: il peut s'agir de contenu soumis au droit d'auteur ou d'autres sources soumises <em>au copyright</em>.<br></p>
}


// question: 608891  name: S1Q3
::S1Q3::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation incorrecte \:<br></p>{
	~Avec Internet, nous sommes confrontés à une massification documentaire et à une abondance d’informations.
	=Le Web peut être considéré comme un jeune outil de la transmission d’informations, celui-ci a été mis en place il y a une cinquantaine d’années.
	~Le Web est un outil collaboratif où tous les internautes peuvent diffuser de l’information.
	####<p dir\="ltr" style\="text-align\: left;">L'avènement du Web a très clairement augmenté la masse d'informations disponibles, notamment de par son aspect collaboratif permettant à n'importe quel internaute de créer et de diffuser du contenu. Cela dit, si le Web ne date pas d'hier, c'est à partir de 1990 - donc il y a une trentaine d'années - qu'il a fait son apparition.<br></p>
}


// question: 608892  name: S1Q4
::S1Q4::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation incorrecte \:<br></p>{
	~Le Web est une application d’Internet, qui a permis de faciliter la recherche dans la masse d’informations présente en ligne.
	=Le mouvement de l’Open Access, né au XXIe siècle, vise à ouvrir l’accès au savoir scientifique.
	~La bibliothèque, média de la transmission du savoir, s’est adaptée aux évolutions récentes, en intégrant le support numérique aux autres supports de ses collections.
	####<p dir\="ltr" style\="text-align\: left;">La Budapest Open Archives Initiative date de 2002, mais elle n'est pas la première initiative d'archive ouverte \: il s'agit d'arXiv, qui date de 1991 et donc du XXe siècle.<br></p>
}


// question: 608893  name: S1Q5
::S1Q5::[html]<p dir\="ltr" style\="text-align\: left;">Cochez l’affirmation incorrecte \:<br></p>{
	~Les sites web, les vidéos, les blogs et les tweets sont des documents.
	=La naissance de la profession d’éditeur est concomitante à celle d’imprimeur, ce qui a permis une diffusion plus large des livres.
	~L’information peut prendre une multitude de formes telles que les signes, les images, les événements...
	####<p dir\="ltr" style\="text-align\: left;">L'imprimerie a été inventée par Gutenberg vers le milieu du XVe siècle, mais ce n'est qu'au XVIIIe siècle que la profession d'éditeur s'est réellement développée, en raison de l'augmentation de la quantité de livres publiés, marquant ainsi le début de l'industrialisation du livre.<br></p>
}


// question: 608896  name: S2Q1
::S2Q1::[html]<p>Sur base de cette référence et du document y correspondant (consultable via le lien URL ou le doi), répondez à la question ci-dessous \: </p>\n  \n  <p style\="display\:block; line-height\: 2; margin-left\: 2em; text-indent\:-2em;"> Libre accès (édition scientifique). (n.d.). In <i>Wikipédia</i>. Retrieved January 15, 2019, from <a href\=" https\://fr.wikipedia.org/wiki/Libre_acc%C3%A8s_(%C3%A9dition_scientifique)" target\="_blank"> https\://fr.wikipedia.org/wiki/Libre_acc%C3%A8s_(%C3%A9dition_scientifique)</a></p>\n\nCe document est \: <i>(2 bonnes réponses à cocher)</i> {
	~<p dir\="ltr" style\="text-align\: left;">Un document conventionnel<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un article scientifique<br></p>
	~Un article à caractère scientifique
	~%50%<p dir\="ltr" style\="text-align\: left;">Un article d'encyclopédie collective<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document non scientifique<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Cet article est issu de l'encyclopédie collaborative Wikipédia, il s'agit donc d'un document non scientifique. Puisqu'il ne suit pas le chemin de l'édition, le document n'est pas conventionnel . Il ne s’agit pas non plus d'un article scientifique ou à caractère scientifique car il n'est pas entièrement rédigé par des académiques ou chercheurs ni publié dans une revue scientifique.<br></p>
}


// question: 608905  name: S2Q10
::S2Q10::[html]<p>Sur base de ces images, répondez à la question ci-dessous.</p> \n\n<p><a href\="@@PLUGINFILE@@/Archimag.jpg?time\=1637589414717" target\="_blank"><img src\="@@PLUGINFILE@@/Archimag.jpg" alt\="Magazine Archimag" class\="img-responsive atto_image_button_text-bottom" width\="400" height\="292"></a></p>\n\n\nCe document est \: <i>(1 bonne réponse à cocher)</i>{
	~<p dir\="ltr" style\="text-align\: left;">Un document scientifique<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un document non conventionnel<br></p>
	~Un article de presse
	~<p dir\="ltr" style\="text-align\: left;">Un rapport<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Un document conventionnel<br></p>
	####Ce document est un document conventionnel car il s'agit d'un magazine inscrit, donc, dans le circuit de l'édition. Il ne s'agit pas d'un rapport (document non conventionnel), ni d'un article de presse (magazine spécialisé), ni d'un document scientifique (magazine des professionnels de l'information).<br>
}


// question: 608897  name: S2Q2
::S2Q2::[html]<p>Sur base de cette référence et du document y correspondant (consultable via le lien URL ou le doi), répondez à la question ci-dessous \:</p> \n\n\n<p style\="display\:block; line-height\: 2; margin-left\: 2em; text-indent\:-2em;"> \n\nArenas Garcìa, R. (2018, October 09). A Short Comment on « The Future Relationship Between the United Kingdom and the European Union » (Chequers Plan) [Blog post]. Retrieved from <a href\="https\://blogdroiteuropeen.com/2018/10/09/a-short-comment-on-the-future-relationship-between-the-united-kingdom-and-the-european-union-chequers-plan-by-rafael-arenas-garcia/" target\="_blank"> https\://blogdroiteuropeen.com/2018/10/09/a-short-comment-on-the-future-relationship-between-the-united-kingdom-and-the-european-union-chequers-plan-by-rafael-arenas-garcia/</a></p>\n\nCe document est \: <i>(1 bonne réponse à cocher)</i>{
	=<p dir\="ltr" style\="text-align\: left;">Un document non conventionnel<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un article scientifique<br></p>
	~Une page web d'un site institutionnel
	~<p dir\="ltr" style\="text-align\: left;">Un document scientifique<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un article à caractère scientifique<br></p>
	####<p dir\="ltr" style\="text-align\: left;">Ce document est un document non conventionnel, car il n'est pas issu du circuit de l'édition. En tant que post de blog, et s'agissant d'un commentaire sur un Livre Blanc publié par le gouvernement britannique, il ne peut pas être considéré comme document ou article scientifique, ni comme article à caractère scientifique bien qu’il soit rédigé par un professeur d’Université.<br></p>
}


// question: 608898  name: S2Q3
::S2Q3::[html]<p>Sur base de cette référence et du document y correspondant (consultable via le lien URL ou le doi), répondez à la question ci-dessous \:</p> \n\n<p style\="display\:block; line-height\: 2; margin-left\: 2em; text-indent\:-2em;"> \n\n  Brauer, M., and Chappe, B. (2008). Les stéréotypes et la variabilité perçue dans les groupes \: état des lieux et enjeux. <i>L'Année psychologique, 108</i>(1), 133-167. Retrieved from <a href\="https\://www.persee.fr/doc/psy_0003-5033_2008_num_108_1_30964" target\="_blank"> https\://www.persee.fr/doc/psy_0003-5033_2008_num_108_1_30964</a>\n</p>\n\nCe document est \: <i>(3 bonnes réponses à cocher)</i>{
	~<p dir\="ltr" style\="text-align\: left;">Un document non conventionnel<br></p>
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Un document conventionnel<br></p>
	~Un article professionnel
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Un document scientifique<br></p>
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Un article scientifique<br></p>
	####Ce document est un document conventionnel scientifique, et plus précisément un article scientifique. Il a en effet suivi le chemin de l'édition (publié dans une revue scientifique), est écrit par des chercheurs et a été soumis à un processus de <i>peer-review</i>.
}


// question: 608899  name: S2Q4
::S2Q4::[html]<p>Sur base de cette référence et du document y correspondant (consultable via le lien URL ou le doi), répondez à la question ci-dessous \:</p> \n\n<p style\="display\:block; line-height\: 2; margin-left\: 2em; text-indent\:-2em;"> \n\nMagarey, S. (2014). <i>Dangerous Ideas\: Women’s Liberation – Women’s Studies – Around the World\:</i> University of Adelaide Press. Retrieved from <a href\="https\://www.doabooks.org/doab?func\=fulltext&amp;uiLanguage\=en&amp;rid\=16550" target\="_blank">https\://www.doabooks.org/doab?func\=fulltext&amp;uiLanguage\=en&amp;rid\=16550</a>\n</p>\n\nCe document est \: <i>(1 bonne réponse à cocher)</i>{
	~<p dir\="ltr" style\="text-align\: left;">Un ouvrage collectif<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un document non conventionnel<br></p>
	~Un acte de colloque
	~<p dir\="ltr" style\="text-align\: left;">Un document non scientifique<br></p>
	=<p dir\="ltr" style\="text-align\: left;">Un livre électronique<br></p>
	####Ce document est un document scientifique et conventionnel car publié aux presses de l'Université d'Adélaïde ; il s'agit donc d'un livre électronique. Écrit par un auteur, ce n'est pas un ouvrage collectif, ni un acte de colloque car il n'est pas issu d'une intervention orale en conférence.
}


// question: 608900  name: S2Q5
::S2Q5::[html]<p>Sur base de cette référence et du document y correspondant (consultable via le lien URL ou le doi), répondez à la question ci-dessous \:</p> \n\n<p style\="display\:block; line-height\: 2; margin-left\: 2em; text-indent\:-2em;"> \n\nOECD. (2018). Transition des études au marché du travail \: une étape aussi difficile pour tous les groupes d’âge ? <i>Les indicateurs de l’enseignement à la loupe, 54.</i> doi\: <a href\="https\://doi.org/10.1787/e30b1bf2-fr" target\="_blank">https\://doi.org/10.1787/e30b1bf2-fr</a> \n\n</p>\n\nCe document est \: <i>(2 bonnes réponses à cocher)</i>{
	~%50%<p dir\="ltr" style\="text-align\: left;">Une publication officielle<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un document conventionnel<br></p>
	~Un acte de colloque
	~%50%<p dir\="ltr" style\="text-align\: left;">&nbsp;Un document non scientifique<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Une source<br></p>
	####Il ne s'agit pas d'un document conventionnel car il n'a pas suivi le circuit de l'édition. Il ne consigne pas les interventions orales d'un congrès et n'est donc pas un acte de colloque. Basé sur l'analyse de sources, c'est donc un travail. Il s’agit d’une publication officielle de l'OCDE, mais ce document est non scientifique, car il ne s'inscrit pas dans une démarche de recherche.<br><br>
}


// question: 608901  name: S2Q6
::S2Q6::[html]<p>Sur base de ces images, répondez à la question ci-dessous.</p>\n\n<p>\n  <a href\="@@PLUGINFILE@@/Publier_en_sciences_humaines.jpg?time\=1637588827246" target\="_blank">\n    <img src\="@@PLUGINFILE@@/Publier_en_sciences_humaines.jpg" alt\="Publier en sciences humaines - livre" class\="img-responsive atto_image_button_text-bottom" width\="300" height\="224">\n  </a>\n</p>\n\n\nCe document est \: <i>(2 bonnes réponses à cocher)</i>{
	~<p dir\="ltr" style\="text-align\: left;">Un article de presse<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un article scientifique<br></p>
	~Un article d'encyclopédie
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document scientifique<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document conventionnel<br></p>
	####Ce livre est un document conventionnel, car il a suivi le circuit de l'édition. C'est également un document scientifique, il s'agit d'actes de colloques de l'institut de recherche Iacchos publiés par aux éditions Academia l'Harmattan.<br><br>
}


// question: 608902  name: S2Q7
::S2Q7::[html]<p>Sur base de ces images, répondez à la question ci-dessous.</p> \n\n<p><img src\="@@PLUGINFILE@@/SciencesHumaines.jpg" alt\="Couverture sciences humaines" class\="img-responsive atto_image_button_text-bottom" width\="372" height\="258"></p>\n\n\nCe document est \: <i>(2 bonnes réponses à cocher)</i>{
	~<p dir\="ltr" style\="text-align\: left;">Un article d'encyclopédie<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document non scientifique<br></p>
	~Un article professionnel
	~<p dir\="ltr" style\="text-align\: left;">Un ouvrage collectif<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document conventionnel<br></p>
	####Il s'agit d'un document conventionnel non scientifique, car c'est une revue de vulgarisation qui a suivi le chemin de l'édition.<br><br>
}


// question: 608903  name: S2Q8
::S2Q8::[html]<p>Sur base de cette image, répondez à la question ci-dessous.</p> \n\n<p><a href\="@@PLUGINFILE@@/Memoire.jpg?time\=1637589152875" target\="_blank"><img src\="@@PLUGINFILE@@/Memoire.jpg" alt\="Memoire" class\="img-responsive atto_image_button_text-bottom" width\="350" height\="495"></a></p>\n\n\nCe document est \: <i>(2 bonnes réponses à cocher)</i>{
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document non scientifique<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un livre<br></p>
	~&nbsp;Une thèse
	~<p dir\="ltr" style\="text-align\: left;">Un document scientifique<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document non conventionnel<br></p>
	####Il s’agit d’un mémoire de fin d'études ; il est donc non conventionnel car il n'a pas suivi le circuit de l’édition. Il est aussi considéré comme non scientifique car il n'a pas été rédigé par un chercheur qualifié.<br>
}


// question: 608904  name: S2Q9
::S2Q9::[html]<p>Sur base de ces images, répondez à la question ci-dessous.</p> \n\n<p><a href\="@@PLUGINFILE@@/Dictionnaire_du_travail.jpg?time\=1637589286725" target\="_blank"><img src\="@@PLUGINFILE@@/Dictionnaire_du_travail.jpg" alt\="Dictionnaire du travail" class\="img-responsive atto_image_button_text-bottom" width\="400" height\="300"></a></p>\n\n\nCe document est \: <i>(2 bonnes réponses à cocher)</i>{
	~<p dir\="ltr" style\="text-align\: left;">Une contribution à ouvrage collectif<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un article scientifique<br></p>
	~%50%Un article de dictionnaire disciplinaire
	~%50%<p dir\="ltr" style\="text-align\: left;">Un document scientifique<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Un document non conventionnel<br></p>
	####Ce document est un article de dictionnaire disciplinaire et un document scientifique, car il a été édité par un éditeur scientifique ; il a donc un valeur informationnelle scientifique.<br>
}


// question: 608906  name: S3Q1
::S3Q1::[html]Sélectionner la/les action(s) menant à la conséquence énoncée.<br><br><br><strong>Obtenir une liste de résultats pertinents faisant état de peu de bruit documentaire</strong>{
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Cibler les mots-clés en se renseignant sur les choix d'indexation de l'outil<br></p>
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Choisir un vocabulaire adéquat pour constituer les mots-clés de la requête<br></p>
	~Lancer une requête dans un discovery tool
	~<p dir\="ltr" style\="text-align\: left;">Analyser les documents récoltés<br></p>
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Inclure des opérateurs booléens<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Inclure des éléments de troncature à chaque mot-clé de la requête<br></p>
	####Pour éviter d’être confrontés à du bruit documentaire, c’est-à-dire un nombre élevé de résultats non-pertinents, vous devez appliquer méthodiquement les deuxième et troisième étapes reprises dans la méthode de recherche documentaire présentée (établir des mots-clés pertinents et les lier entre eux à l’aide d’opérateurs booléens).<br><br>A l’inverse, la recherche dans un discovery tool vous amènera un nombre trop élevé de résultats, du fait de sa nature – un méta-moteur (pour rappel, c’est un outil parcourant plusieurs moteurs de recherche et présentant les résultats sur une interface unique). De même, l’usage d’éléments de troncature élargira le panel de vos résultats. L’analyse des documents récoltés, dernière étape de la méthode quant à elle, n’entre pas en ligne de compte pour réduire le bruit documentaire.
}


// question: 608907  name: S3Q2
::S3Q2::[html]Sélectionner la/les action(s) menant à la conséquence énoncée.<strong><br><br><br>Obtenir une liste de documents scientifiques</strong>{
	~<p dir\="ltr" style\="text-align\: left;">Appliquer la méthode des 5WH<br></p>
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">&nbsp;Lancer une recherche dans un catalogue académique<br></p>
	~Utiliser un élément de troncature
	~%33.33333%<p dir\="ltr" style\="text-align\: left;">Consulter une base de données bibliographiques disciplinaire<br></p>
	~%33.33333%Utiliser le filtre "peer-review"
	~Utiliser le filtre "documents électroniques"
	####Pour obtenir une liste de documents scientifiques, il est indispensable de consulter des outils de recherche documentaire fiables comme des bases de données bibliographiques disciplinaires ou un catalogue académique. Une fois votre requête lancée, en appliquant le filtre « peer-review » quand il est disponible, vous vous assurerez de l’obtention de résultats scientifiques, au sens strict.<br><br>Par contre, appliquer la méthode des 5WH et utiliser des éléments de troncature, même s’ils font partie intégrante de la méthode de recherche documentaire, ne sont pas spécifiquement utiles pour trouver des documents scientifiques. De même, un document électronique n’est pas toujours un document scientifique, et un document scientifique n’est pas toujours au format électronique.
}


// question: 608908  name: S3Q3
::S3Q3::[html]<p>Sélectionner la/les action(s) menant à la conséquence énoncée. <br></p><p>\n\n<strong>Obtenir une liste des publications des membres de la communauté scientifique</strong></p>{
	~%50%<p dir\="ltr" style\="text-align\: left;">Réaliser une recherche par auteur<br></p>
	~<p dir\="ltr" style\="text-align\: left;">&nbsp;Passer en revue chaque document récolté<br></p>
	~Consulter un site organisationnel fiable
	~<p dir\="ltr" style\="text-align\: left;">Consulter le thésaurus de l'outil de recherche<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Consulter un dépôt institutionnel<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Utiliser le filtre "peer-review"<br></p>
	####Pour obtenir une liste des publications des membres de la communauté scientifique, il faut se diriger prioritairement vers la consultation d’un dépôt institutionnel, archive dédiée au dépôt des productions scientifiques d’une institution académique. En faisant une recherche par auteur, vous pourrez identifier rapidement quels sont les membres de la communauté qui ont publié sur un sujet particulier. Ces éléments vous permettent de gagner du temps pour ne pas devoir passer en revue chaque document récolté.<br><br>Par contre, les sites organisationnels fiables ne contiennent pas de publications scientifiques. De même, le filtre « peer-review » ne sera pas adéquat dans ce contexte, puisque certains membres d’une communauté scientifique peuvent publier des documents de travail ou des prépublications.<br><br>En outre, consulter un thésaurus ne vous indique que les mots-clés qui sont indexés par l’outil de recherche.
}


// question: 608909  name: S3Q4
::S3Q4::[html]Sélectionner la/les action(s) menant à la conséquence énoncée.<strong><br><br>Choisir l'outil de recherche documentaire adéquat</strong>{
	~<p dir\="ltr" style\="text-align\: left;">Appliquer la méthode des 5WH<br></p>
	~<p dir\="ltr" style\="text-align\: left;">Lister les synonymes des mots-clés choisis<br></p>
	~Vérifier l'existence d'un thésaurus
	~%50%<p dir\="ltr" style\="text-align\: left;">&nbsp;Cibler la discipline concernée par la thématique de recherche<br></p>
	~<p dir\="ltr" style\="text-align\: left;">&nbsp;Utiliser le filtre "période de publication"<br></p>
	~%50%<p dir\="ltr" style\="text-align\: left;">Déterminer les types de documents nécessaires<br></p>
	####Choisir l’outil de recherche adéquat vous aidera à trouver des résultats pertinents rapidement. Il est donc primordial de déterminer quels sont les types de documents que vous souhaitez exploiter \: cela vous permettra de déterminer quel type d’outil vous devez consulter. Ensuite, cibler la discipline concernée par votre recherche vous permettra de privilégier un outil disciplinaire.<br><br>A l’inverse, appliquer la méthode des 5WH, lister les synonymes des mots-clés choisis, vérifier l’existence d’un thésaurus et utiliser les filtres sont des processus à achever dans le cadre d’autres étapes de la méthode de recherche documentaire qui n’entrent pas en ligne de compte pour le choix de l’outil de recherche.
}


// question: 608910  name: S3Q5
::S3Q5::[html]Sélectionner la/les action(s) menant à la conséquence énoncée.<strong><br><br>Élaborer une équation de recherche efficace</strong>{
	~<p dir\="ltr" style\="text-align\: left;">Choisir un outil de recherche généraliste</p>
	~%25%<p dir\="ltr" style\="text-align\: left;">Vérifier la signification des concepts dans des dictionnaires disciplinaires</p>
	~%25%Inclure des opérateurs booléens
	~%25%<p dir\="ltr" style\="text-align\: left;">S'interroger sur sa thématique de recherche</p>
	~<p dir\="ltr" style\="text-align\: left;">Analyser la pertinence des résultats obtenus</p>
	~%25%<p dir\="ltr" style\="text-align\: left;">Chercher les synonymes et traduire la liste de mots-clés en anglais</p>
	####Pour élaborer une équation de recherche efficace, il est primordial d’appliquer sérieusement les premières étapes de la méthode de recherche documentaire.<br><br>Par contre, choisir un outil de recherche généraliste risque de vous amener du bruit documentaire. Quant au fait d’analyser la pertinence des résultats obtenus, même si cela représente une étape essentielle dans le procédé, elle ne permet pas directement d’améliorer une requête initiale.
}


