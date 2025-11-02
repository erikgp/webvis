import csv


# This file can be used standalone with some manual fixes
# 0. It is wise to save a backup of the original protokoll_data.js before writing it over with a new, maybe not working, version.
# 1. First convert InhHast.txt to utf-8 and unix line endings.
#    Example, under unix and mac:
#      iconv -f iso-8859-1 -t utf-8 tmp/InjHast.txt | dos2unix > tmp/i.csv
# 2. Rename the coverted file to tmp/i.csv  (if it does not already is named i.csv)
# 3. Run this file and save the output, ex:
#        python3 tojson3.py <path_to_i.csv> > i2.json
#    For example:
#        python3 tojson3.py i.csv > i2.json
# 4. Fix problems in a text editor (for exmaple, remove entries that are comments)
# 5. Add version info (See example files or filformat.txt )
# 6. Rename file to: protokoll_data.js
# 7. Move the file to the same directory as where kontrast.html is located
#
# Notera: le = "" (eller le = "\n" ) nedan.
# Detta anger hur varje del av ett protokoll kommer att se ut i filen som genereras.
# Med le = "" så står varje protokoll på en egen rad med alla delar av protokollet på samma rad.
# Sätter man le="\n" så får man istället varje del av protkollet på en egen rad och hela protkollet kommer att stå på flera rader.
# Det är lite mer översiktligt

import sys

if len(sys.argv) != 2:
    print("Usage: python3 tojson3.py <filename>", file=sys.stderr)
    sys.exit(1)


try:
    csvfile = open(sys.argv[1], newline = '')
except Exception as e:
    print(f"Error: {e}")
    sys.exit(2)


r = csv.reader(csvfile)

# Välj här om du vill ha varje protkoll på en rad eller uppdelat på flera rader
le = "\n";

# Row in file:
#   "Angio arm 80kV",250,350,25,10,80,""
# proto_name_fixed, proto_name, dos, konc, injtid, skit, maxvikt, info
#    0                1          2    3      4       5     6       7

first = True

print("protokoll = [ ")
for row in r:   # every row to list
    if ( not first):
        print("},")

    print("{", end=le)
    # No use of id
    # r = row[0].lower().replace("+","").replace("   "," ").replace("  "," ").replace("&","").replace("<","").replace(">","").translate(str.maketrans(" åäö/", "_aao_"))
    # print("\"id\": \"", r, "\",",  sep="", end=le)
    r = row[0].replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
    print("name: \"", r, "\"," , sep="", end=le)
    # print("\"info\": \"", row[6].replace("\n", "<br/>").replace("<","&lt;").replace(">","&gt"), "\",",  sep="")
    print("dos: ", row[1], ",",  sep="", end=le)
    print("konc: ", row[2], ",",  sep="", end=le)
    print("tid: ", row[3], ",", sep="", end=le)
    print("maxvikt: ", row[5], ",", sep="", end=le)
    r = row[6].replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace("\n", "<br/>")
    print("info: \"", r, "\",",  sep="", end=le)
    print("comment: \"\"",  sep="", end=le)
    first = False

print("}")    # end last stuff
print("]")   # end it all
print("")

csvfile.close()



