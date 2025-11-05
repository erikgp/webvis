## Kroppsyta
## Skillnad mellan du Bois & duBois och Haycock
## för barn i åldrarna 2 år - 16 år
## Samtliga "tänkbara" värden inom 3 SD enl tillväxtkurvor

library(tidyverse)

## från tillväxtkurvor (+- 3SD med -3 SD för flickor och +3 SD för pojkar):
## 2år: 9-19 kg, 78-98 cm
## 4år: 12-24 kg,  92-116 cm
## 6år: 14-32       104-132
## 8år: 16-38     112-148
## 10år: 24-50   122-159
## 12år: 27-64   130-172
## 14år: 34-78   138-186
## 16år: 38-95   144-198


## 2år
w <- seq(9, 19, 2)
h <- seq(78, 98, 3)

df <- merge(w, h)

## 4 år
w <- seq(12, 24, 2)
h <- seq(92, 116, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)

## 6 år
w <- seq(14, 32, 2)
h <- seq(104, 132, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)


## 8 år
w <- seq(16, 38, 2)
h <- seq(112, 148, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)


## 10 år
w <- seq(24, 50, 2)
h <- seq(122, 158, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)


## 12 år
w <- seq(27, 64, 2)
h <- seq(130, 172, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)


## 14 år
w <- seq(34, 78, 2)
h <- seq(138, 186, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)


## 16 år
w <- seq(38, 95, 2)
h <- seq(144, 198, 3)

df2 <- merge(w, h)
df <- rbind(df, df2)

head(df)
df <- rename(df, w=x, h=y)
head(df)

db <- function(w, h) {
   return (w^0.425 * h^0.725 * 0.007184);    
}

hay <- function(w, h) {
    return (w^0.5378 * h^0.3964 * 0.024265);
}



df <- mutate(df, db = db(w, h), hay = hay(w, h))
df

plot(df$hay ~ df$db, xlim=c(0,3), ylim=c(0,3))
abline(a=0, b=1)
?abline

df$dhkvot <- df$db / df$hay
df$hdkvot <- df$hay / df$db

min(df$dhkvot)
## ~ 0.89
max(df$dhkvot)
## ~ 1.12

min(df$hdkvot)
## ~ 0.89
max(df$hdkvot)
## ~ 1.12

t <- filter(df, dhkvot > 1.08 | dhkvot < 0.92)
plot(h ~ w, data=t, xlim=c(0,100), ylim=c(0, 200))
t %>%
    ggplot(aes(x=w, y=h)) +
    geom_point() +
    coord_cartesian(xlim=c(0,100), ylim=c(0,200)) +
    labs(x="Vikt (kg)", y="Längd (cm)") +
    scale_x_continuous(breaks=seq(0, 100, 10)) +
    scale_y_continuous(breaks=seq(0, 200, 10)) +
    theme_bw()


min(df$db)
min(df$hay)

## Om vi antar att Haycock är korrekt men du Bois inte är det, så avviker duBois med som mest upp och ned drygt 10% i kroppsyta.
## De största avvikelserna ses vid "orimliga" kombinationer av vikt och längd.

## Enl art [1] så avviker metoderna (verkligt pat.-material) genomsnittligen 3% (SA: 0.25 - 0.45 m2) och 1 % (SA: 0.45 - 1.35 m2) där Haycock ger större kroppsyta!
## Eftersom rev-ML ger rGFR så innebär detta, med aGFR = rGFR/1.73 * SA, att vid användande av du Bois så kommer aGFR att underskattas jmf Haycock
##   ==> ok att använda du Bois

## [1]  Haycock et al. Geometric method for measuring body surface area: A height-weight formula validated in infants, children, and adults.
##      J Pediatr. 1978 Jul;93(1):62-6.

