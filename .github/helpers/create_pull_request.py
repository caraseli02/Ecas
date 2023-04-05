#!/usr/bin/env python3
from github import Github

import subprocess
import sys
import os
import re


def main():
    print ("starting", flush=True)

    atk = sys.argv[1]
    repo = sys.argv[2]
    ref = sys.argv[3]
    actor = sys.argv[4]

    g = Github(atk)
    r = g.get_repo(repo)

    pulls = r.get_pulls(base='main', head=os.getenv("GITHUB_REPOSITORY_OWNER")+":"+ref)
    if pulls.totalCount > 0:
        print ('PR was already created')
        return

    title = ref.split('/',2)[2].replace('_', ' ')
#     issue_number = re.search(r'(\d+)', title).group(1)
    issue_number = '0'
    body = 'Resolves #' + issue_number

    pr = r.create_pull(title=title, body=body, base="main", draft=False, head=ref)
    pr.add_to_assignees(actor)

main()
