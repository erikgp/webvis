library(tidyverse)
rm(list=ls())

# comment START
# Compares rev-lm estimated rGFR values from javascript and from the function below, taken directly from the original article.
#
#
#  Revised Lund-Malmö from original publication:
#    Nyman et al. The revised Lund-Malmö GFR estimating equation outperforms MDRD and CKD-EPI across GFR, age   and BMI intervals in a large Swedish population.
#    Clin Chem Lab Med 2014; 52(6): 815–824
#    https://lucris.lub.lu.se/ws/files/2046106/5336237.pdf
#
#    e^(X–0.0158×Age+0.438×ln(Age))
#
#    Female pCr < 150 mmol/L: X = 2.50+0.0121 × (150–pCr)
#    Female pCr ≥ 150 mmol/L: X = 2.50–0.926 × ln(pCr/150)
#    Male pCr < 180 mmol/L: X = 2.56+0.00968 × (180–pCr)
#    Male pCr ≥ 180 mmol/L: X = 2.56–0.926 × ln(pCr/180)
# comment END

age <- seq(20, 110, 10)
kreat <- seq(10, 300, 10)

df <- merge(age, kreat) %>% rename(age = x, kreat = y)

# sex: female == 0, male == 1
rgfr = function(age, kreat, sex) {
  x = 0
  if (sex == 0) {  # female
    if (kreat < 150) {
      x = 2.50+0.0121 * (150-kreat)
    }
    else {
      x = 2.50 - 0.926 * log(kreat/150)
    }
  }
  else {  # Male
    if (kreat < 180) {
      x = 2.56+0.00968 * (180-kreat)
    }
    else {
      x = 2.56 - 0.926 * log(kreat/180)
    }
  }
  return ( exp(x-0.0158*age+0.438*log(age)) )
}
vrgfr = Vectorize(rgfr)

df <- df %>% mutate(gfr_fem_r = vrgfr(age, kreat, 0), gfr_male_r = vrgfr(age, kreat, 1))

df2 <- read.csv(file= "revlm-validation_results.csv")
# check for large errors
str(df2)
filter(df2, abs(gfr_fem - egfr_fem) > 1e-10)    # OK
filter(df2, abs(gfr_male - egfr_male) > 1e-10)    # OK
# OK. No sign diff between our rev-lm code and rev-lm code on egfr.se

df3 <- full_join(df, df2, by = join_by(age==age, kreat==kreat)) %>% mutate(female_diff_r = abs(gfr_fem - gfr_fem_r), male_diff_r = abs(gfr_male - gfr_male_r))

filter(df3, female_diff_r > 1e-10 | male_diff_r > 1e-10)
# OK. No sign diff between our javascript rev-lm code and rev-lm code from original article




