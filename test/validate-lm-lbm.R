library(tidyverse)
rm(list=ls())


# comment START
# Compares lm-lbm estimated GFR values from javascript and from the function below, taken directly from the original article.
#
#
#  Revised Lund-Malmö from original publication:
#    Nyman et al. Standardization of p-creatinine assays and use of lean body mass allow improved prediction of calculated glomerular filtration rate in adults: A new equation
#    Scand J Clin Lab Invest 2006; 66: 451–468
#
#  aGFR (mL/min):  exp(X -0.0128 * age + 0.387 * ln(age) + 1.1 * ln(LBM))
#  X = -0.0111 * kreat    (kreat < 150 umol/L)
#  X = 3.55 + 0.0004 * kreat - 1.07 * ln(kreat)   (kreat >= 150 umol/L)
# 
# I original-artikeln så anges LBM enligt James. I omnivis-dokumentation anges att LBM enligt Boer har ersatt detta pga LBM enligt James kraftigt underskattar
# LBM vid höga BMI
#
# LBM enl Boer, Estimated lean body mass as an index for normalization of bodv fluid volumes in humans. Am J Physiol 1984; 247: F632-5
#
# comment END

age <- seq(20, 110, 40)
weight <- seq(30, 150, 40)
h <- seq(130, 210, 40)
kreat <- seq(50, 300, 40)

df <- crossing(age, weight, h, kreat) %>% rename(vikt = weight, langd = h)

# Lean body mass from weight (w/kg), height (h/cm), and sex (male == 1)
lbm = function(w, h, s) {
  if (s == 1) { # male
    return (0.407 * w + 0.267 * h - 19.2)
  }
  else {
    return (0.252 * w + 0.473 * h - 48.3)
  }
}

# BSA BuBois
# w (kg), h (cm)
bsa = function(w, h) {
  return (0.007184 * w^0.425 * h^0.725)
}


# sex: female == 0, male == 1
# l : lean body mass
agfr = function(age, kreat, l) {
  #  aGFR (mL/min):  exp(X -0.0128 * age + 0.387 * ln(age) + 1.1 * ln(LBM))
  #  X = -0.0111 * kreat    (kreat < 150 umol/L)
  #  X = 3.55 + 0.0004 * kreat - 1.07 * ln(kreat)   (kreat >= 150 umol/L)
  x = 0
  if (kreat < 150) {
    x = -0.0111 * kreat
  }
  else {
      x = 3.55 + 0.0004 * kreat - 1.07 * log(kreat)
  }
  return (exp(x - 0.0128 * age + 0.387 * log(age) + 1.1 * log(l)))
}

df$lbm_f = mapply(function(w, h) lbm(w, h, 0), df$vikt, df$langd)
df$lbm_m = mapply(function(w, h) lbm(w, h, 1), df$vikt, df$langd)
df$bsa = mapply(bsa, df$vikt, df$langd)


df$agfr_f = mapply(agfr, df$age, df$kreat, df$lbm_f)
df$agfr_m = mapply(agfr, df$age, df$kreat, df$lbm_m)

df$rgfr_f = df$agfr_f / df$bsa * 1.73
df$rgfr_m = df$agfr_m / df$bsa * 1.73


df2 <- read.csv(file= "lm-lbm-validation_results.csv")

df3 <- full_join(df, df2, by=join_by(age==age, vikt==vikt, langd==langd, kreat == kreat))

rm(df, df2)

# check for large errors
filter(df3, abs(rgfr_f - rgfr_fem) > 1e-10)    # OK
filter(df3, abs(rgfr_m - rgfr_male) > 1e-10)    # OK
filter(df3, abs(agfr_f - agfr_fem) > 1e-10)    # OK
filter(df3, abs(agfr_m - agfr_male) > 1e-10)    # OK
# OK. No sign diff between our rev-lm code and rev-lm code on egfr.se



