import os

file_path = r'./docs/zh/tidb'
split_path = r'./docs'

sidebar_list=[]

def get_store_struct():
    if os.path.isdir(file_path):
        dir_res = os.listdir(file_path)
        for path in dir_res:
            sub_path = file_path+"/"+path
            # get out of `index.md/index.html` in current dir.
            if os.path.isdir(sub_path): 
                # print(path)
                dir_sub_res = os.listdir(sub_path)
                for dir_in_subdir in dir_sub_res:
                    if os.path.isdir(sub_path+"/"+dir_in_subdir):
                        # print("    "+dir_in_subdir)
                        files_in_sub_res = os.listdir(sub_path+"/"+dir_in_subdir)
                        for file in files_in_sub_res:
                            if os.path.isfile(sub_path+"/"+dir_in_subdir+"/"+file):
                                # print("        "+file)
                                sidebar_list.append((path, dir_in_subdir,file_path.split(split_path)[1]+"/"+path+"/"+dir_in_subdir+"/"+file))


def gen_sub_sidebar(sidebar_list):
    print('const tidbDocSideBar = [')
    last_sidebar = ''
    last_sub_sidebar = ''
    for index, sidebar in enumerate(sidebar_list):
        # output end flag
        if len(sidebar_list) - 1 == index:
            continue
        elif sidebar_list[index-1][1] != sidebar[1] and index != 0:
            print('            ] },')
        if sidebar_list[index-1][0] != sidebar[0] and index != 0:
            print('    ] },')
        if last_sidebar != sidebar[0]:
            print('    {text: "'+sidebar[0]+'", items: [')
        last_sidebar=sidebar[0]
        if last_sub_sidebar != sidebar[1]:
            print('            { text: "'+sidebar[1]+'", items: [')
        last_sub_sidebar=sidebar[1]
        sub_item = sidebar[2].split('/')[5]
        # {text: 'Theory-Percolator分布式事务', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/Theory-Percolator分布式事务.md'},
        print('                { text: "'+sub_item+'", link: "'+sidebar[2]+'"},')
    print('            ] },')
    print('    ] }')
    print(']')

        
        
    

get_store_struct()
sidebar_list.sort()
gen_sub_sidebar(sidebar_list)


# const tidbDocSideBar = [{
#     text: '原理总结',
#     items: [
#         { text: '论文阅读', items: [
#             {text: 'Theory-Percolator分布式事务', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/Theory-Percolator分布式事务.md'},
#             {text: 'Theory-Spanner分布式事务', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/Theory-Spanner分布式事务.md'},
#             {text: 'PaperIsolationLevels学习笔记', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md'},
#             {text: 'PaperIsolationLevels学习笔记', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md'},
#             {text: 'PaperIsolationLevels学习笔记', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md'},
#         ] },
#         { text: '特性摘要', items: [
#             {text: 'PaperIsolationLevels学习笔记', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md'},
#             {text: 'PaperIsolationLevels学习笔记', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md'},
#             {text: 'PaperIsolationLevels学习笔记', link: '/zh/tidb/01TiDB-原理总结/1-1论文阅读/PaperIsolationLevels学习笔记.md'}
#         ] },
#     ]
# },
