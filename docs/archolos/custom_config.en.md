# Custom Config

Want to launch Archolos without troubleshooting with the [FAQ](technical_faq.en.md)?   
Then use this site to generate a working recommended configuration that should most likely fix all* of your problems.  
The configuration will be based on the [latest release](https://github.com/Made-by-HRY/Gothic-Stash/releases/latest/).


## Set Game Resolution

Only the last change matters, either enter it manually or select a resolution from the list.

|                                        |
|:--------------------------------------:|
| [](){ #resolution-placeholder-input }  |
| [](){ #resolution-placeholder-select } |


## Center Window

Maybe you want to play in a window, centered on your screen? To do that, provide your screen resolution below. 
Based on that both the `WindowPosX` and `WindowPosY` in the `SystemPack.ini` will be calculated.

|                                   |
|:---------------------------------:|
| [](){ #center-placeholder-input } |


## Mouse Settings

Using a new mouse with high pooling rate and high DPI? Then the default mouse settings aren't optimal, 
set the `Mouse sensitivity` to `3` and see how much better it is. Apart from that you could try to bypass the default system 
altogether with [GRawInput](https://github.com/SaiyansKing/GRawInput/releases/latest).

|                           |                                        |
|:--------------------------|---------------------------------------:|
| Mouse sensitivity         | [](){ #mouse-placeholder-sensitivity } |
| Horizontal rotation scale |    [](){ #mouse-placeholder-rotation } |
| Mouse smoothing           |   [](){ #mouse-placeholder-smoothing } |


## Miscellaneous Settings

Some other settings that you might like to change.

|                                     |                                   |
|:------------------------------------|----------------------------------:|
| Maximal number of inventory columns | [](){ #misc-placeholder-max-col } |
| Show white weapons trails           |  [](){ #misc-placeholder-trails } |
| Hide focus of empty mobs            |   [](){ #misc-placeholder-focus } |
| Hide item pickup animation          |    [](){ #misc-placeholder-anim } |


## Download ZIP

After setting all the options to your preferences click the button below.  
Please be patient the scripts have to process all of your inputs and modify the recommended settings, 
so it might take some time.

[Download Custom Configuration With All The Settings Set Above](#download-zip){ .md-button .md-button--primary #download-zip-button }  

<!--suppress ALL warnings / errors -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.js" integrity="sha512-3FKAKNDHbfUwAgW45wNAvfgJDDdNoTi5PZWU7ak3Xm0X8u0LbDBWZEyPklRebTZ8r+p0M2KIJWDYZQjDPyYQEA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.js" integrity="sha512-B+gr+zLWg81qxVwvtYwKrmjvQtZKD/GGFF7jD80OfzbqFw+NsbS5faEqpCO7Q7oRw1bYi0+WLJf54j8Vm7NADw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../../assets/javascripts/archolos_custom_config.js"></script>