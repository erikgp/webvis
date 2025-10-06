library(tidyverse)
rm(list=ls())

# comment start
#
# Compares revised kreat for children from own javascript code with revised kreat from egfr.se.
#
# Compares revised kreat for childre from own code with published algo here:
# Nyman et al. Så kan formel för vuxna skatta glomerulär filtration hos barn
# Läkartidningen. 2021;118:20134
# https://lakartidningen.se/vetenskap/sa-kan-formel-for-vuxna-skatta-glomerular-filtration-hos-barn/
#
# Fakta 1. Formler för att omvandla ett barns (<18 år) plasmakreatininvärde till motsvarande värde vid 18 års ålder
# ln är den naturliga logaritmen, Kr är barnets faktiska kreatininvärde (μmol/l), Ålder (år) är barnets aktuella ålder och 
# Kr* är det åldersjusterade kreatininvärdet vid 18 års ålder [11]: 
#  
# Pojkar:
#  ln(Kr*) = ln(Kr) + 0,259 × (18 – Ålder) – 0,543 × ln(18 / Ålder) – 0,00763 × (18^2 – Ålder^2) + 0,0000790 × (18^3 – Ålder^3)
#
# Flickor:
#  ln(Kr*) = ln(Kr) + 0,177 × (18 – Ålder) – 0,223 × ln(18 / Ålder) – 0,00596 × (18^2 – Ålder^2) + 0,0000686 × (18^3 – Ålder^3)
#
# comment end


age <- seq(2, 17)
kreat <- seq(10, 300, 10)
df <- merge(age, kreat) %>% rename(age = x, kreat = y)

# Revised kreat for children. 
# sex (female == 0, male == 1)
revkreat = function(age, kreat, sex) {
  if (sex == 1) { # male
    x = exp(log(kreat) + 0.259 * (18 - age) - 0.543 * log(18 / age) - 0.00763 * (18^2 - age^2) + 0.0000790 * (18^3 - age^3))
  }
  else { # female
    x = exp(log(kreat) + 0.177 * (18 - age) - 0.223 * log(18 / age) - 0.00596 * (18^2 - age^2) + 0.0000686 * (18^3 - age^3))
  }
}




df <- mutate(df, revkreat_fem_r = revkreat(age, kreat, 0), revkreat_male_r = revkreat(age, kreat, 1))

df2 <- read.csv(file="childkreat-validation_results.csv")

df3 <- full_join(df, df2, by = join_by(age==age, kreat==kreat))

str(df3)

filter(df3, abs(revkreat_fem - revkreat_fem_r) > 1e-10)
filter(df3, abs(revkreat_male - revkreat_male_r) > 1e-10)
filter(df3, abs(revkreat_fem - revkreat_fem_egfr) > 1e-10)
filter(df3, abs(revkreat_male - revkreat_male_egfr) > 1e-10)

# NO SIGNIFICANT DIFFERENCES



