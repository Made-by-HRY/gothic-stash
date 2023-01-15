# Niestandardowa Konfiguracja

Chcesz uruchomić Archolos bez potrzeby rozwiązywania problemów z [FAQ](technical_faq.en.md)?
Więc użyj tej strony do wygenerowania sprawnej rekomendowanej konfiguracji, która powinna najprawdopodobniej rozwiązać wszystkie* twoje problemy.
Konfiguracja będzie oparta o [najnowsze wydanie](https://github.com/Made-by-HRY/Gothic-Stash/releases/latest/).


## Ustaw Rozdzielczość Gry

Tylko ostatnia zmiana się liczy albo wpisz ręcznie, albo wybierz z listy.

|                                        |
|:--------------------------------------:|
| [](){ #resolution-placeholder-input }  |
| [](){ #resolution-placeholder-select } |


## Wyśrodkuj Okno

Może chcesz, aby okno gry było wyśrodkowane na ekranie? Żeby tak było, podaj rozdzielczość swojego ekranu poniżej. 
Opierając się na rozdzielczości ekranu i rozdzielczości gry, zostaną obliczone wartości `WindowPosX` i `WindowPosY` w pliku `SystemPack.ini`.

|                                   |
|:---------------------------------:|
| [](){ #center-placeholder-input } |


## Ustawienia Myszy

Korzystasz z nowej myszki z szybką częstotliwością odświeżania i dużym DPI? Więc domyślne ustawienia myszy nie będą optymalne.
Ustaw `Czułość myszy` na `3` i zobacz, o ile lepiej będzie się grało. Poza tym 
możesz spróbować ominąć całkiem domyślny system myszki za pomocą [GRawInput](https://github.com/SaiyansKing/GRawInput/releases/latest). 

|                      |                                        |
|:---------------------|---------------------------------------:|
| Czułość myszy        | [](){ #mouse-placeholder-sensitivity } |
| Pozioma skala obrotu |    [](){ #mouse-placeholder-rotation } |
| Wygładzanie myszy    |   [](){ #mouse-placeholder-smoothing } |


## Różne Ustawienia

Pare innych ustawień, które może chcesz zmienić.

|                                         |                                   |
|:----------------------------------------|----------------------------------:|
| Maksymalna ilość kolumn w ekwipunku     | [](){ #misc-placeholder-max-col } |
| Pokaż białe smugi / połysk broni        |  [](){ #misc-placeholder-trails } |
| Wyłącz podświetlenie pustych mobów      |   [](){ #misc-placeholder-focus } |
| Wyłącz animację podnoszenia przedmiotów |    [](){ #misc-placeholder-anim } |


## Pobierz ZIP

Po ustawieniu wszystkich wyżej według własnych upodobań wciśnij przycisk poniżej.
Proszę, wykaż się cierpliwością, ponieważ program musi przygotować pliki według ustawień, może to chwilę potrwać.

[Pobierz Niestandardową Konfigurację Ze Wszystkimi Ustawieniami Ustawionymi Powyżej](#pobierz-zip){ .md-button .md-button--primary #download-zip-button }  

<!--suppress ALL warnings / errors -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.js" integrity="sha512-3FKAKNDHbfUwAgW45wNAvfgJDDdNoTi5PZWU7ak3Xm0X8u0LbDBWZEyPklRebTZ8r+p0M2KIJWDYZQjDPyYQEA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.js" integrity="sha512-B+gr+zLWg81qxVwvtYwKrmjvQtZKD/GGFF7jD80OfzbqFw+NsbS5faEqpCO7Q7oRw1bYi0+WLJf54j8Vm7NADw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../../assets/javascripts/archolos_custom_config.js"></script>