import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import TextStyle from '@tiptap/extension-text-style'
import Paragraph from '@tiptap/extension-paragraph'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import { BubbleMenu, FloatingMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import React, { useEffect, useCallback, useState } from 'react'
import { SmilieReplacer } from '../utils/SmilieReplacer'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight/lib/core'
import FontFamily from '@tiptap/extension-font-family'
import { db } from '../utils/firebase'
import { doc, setDoc } from "firebase/firestore"; 

const CustomDocument = Document.extend({
    content: 'heading block*',
})

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('js', js)

const publishStory = async (editor, category, publishLink, publishAlert) => {
    const storyContent = editor.getHTML()

    let parser = new DOMParser();
    const documentToFilter = parser.parseFromString(storyContent, 'text/html')
    let titles = documentToFilter.getElementsByTagName('h1')
    let images = documentToFilter.getElementsByTagName('img')
    console.log(titles)
    let storyTitle = titles[0].textContent
    let storyImage = images[0].src
    let storyID = storyTitle.toLowerCase().split(' ').join('-')

    await setDoc(doc(db, "stories", storyID), {
        title: storyTitle,
        image: storyImage,
        category: category,
        timestamp: new Date(),
        content: storyContent,
        hearts: [],
        author: "Matheus J.G. Silva",
        authorAvatar: "https://avatars.githubusercontent.com/u/54675543?v=4"
    });

    publishLink(`/${storyID}`)
    publishAlert(true)
}

const MenuBar = (props) => {
    const options = [
        {
            label: 'General',
            value: 'general'
        },
        {
            label: 'Coding',
            value: 'coding'
        }
    ]

    const[selectedCategory, updateSelectedCategory] = useState('general')

    const setLink = useCallback(() => {
        const previousUrl = props.editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          props.editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        props.editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
    }, [props.editor])

    if (!props.editor) {
        return null
    }

    return (
        <div className='flex justify-center'>
        <div className="inline-flex rounded-md shadow-sm" role="group">
            <button onClick={() => props.editor.chain().focus().toggleHeading({ level: 1 }).run()} className={props.editor.isActive('heading', { level: 1 }) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-t border-b border-l border-primary rounded-l-lg focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border border-primary rounded-l-lg focus:ring-primary'}>
                <i className="fas fa-heading"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().setParagraph().run()} className={props.editor.isActive('paragraph') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-paragraph"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().toggleBlockquote().run()} className={props.editor.isActive('blockquote') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i class="fa-solid fa-quote-left"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().toggleBold().run()} className={props.editor.isActive('bold') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-bold"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().toggleItalic().run()} className={props.editor.isActive('italic') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-italic"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().toggleStrike().run()} className={props.editor.isActive('strike') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-strikethrough"></i>
            </button>
            <button onClick={() => props.editor.commands.setFontFamily('EB Garamond, serif')} className={props.editor.isActive('textStyle', {fontFamily: 'EB Garamond, serif'}) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fa-solid fa-pen-fancy"></i>
            </button>
            <button onClick={() => props.editor.commands.setFontFamily('Mynerve, cursive')} className={props.editor.isActive('textStyle', {fontFamily: 'Mynerve, cursive'}) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fa-solid fa-pencil"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().toggleHighlight().run()} className={props.editor.isActive('highlight') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fa-solid fa-highlighter"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().setTextAlign('left').run()} className={props.editor.isActive({ textAlign: 'left' }) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-align-left"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().setTextAlign('center').run()} className={props.editor.isActive({ textAlign: 'center' }) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-align-center"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().setTextAlign('right').run()} className={props.editor.isActive({ textAlign: 'right' }) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-align-right"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().setTextAlign('justify').run()} className={props.editor.isActive({ textAlign: 'justify' }) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-align-justify"></i>
            </button>
            <button onClick={() => props.editor.chain().focus().toggleCodeBlock().run()} className={props.editor.isActive('codeBlock') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                <i className="fas fa-code"></i>
            </button>
            <button onClick={setLink} className={props.editor.isActive('link') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-t border-b border-primary rounded-r-lg focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-t border-b border-r border-primary rounded-r-lg focus:ring-primary'}>
                <i className="fas fa-link"></i>
            </button>
        </div>

        <div className='ml-5'>
            <select value={selectedCategory} onChange={(e) => {updateSelectedCategory(e.target.value)}} id="countries" class="bg-white border border-primary text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                {
                    options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>

        <div className='ml-5'>
            <button onClick={() => {publishStory(props.editor, selectedCategory, props.publishedLink, props.publishedAlert)}} className='px-4 py-2 font-medium text-white bg-primary px-4 py-2 rounded-lg'><i className="fas fa-paper-plane mr-2"></i> Publish</button>
        </div>
        </div>
    )
}

export default function Tiptap() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
               codeBlock: false, 
            }),
            CodeBlockLowlight
                .configure({
                    lowlight
                }),
            Placeholder.configure({
                placeholder: 'What are we going to talk about today?',
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg'
                }
            }),
            Link,
            TextStyle,
            SmilieReplacer,
            FontFamily.configure({
                types: ['textStyle']
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: 'bg-secondary'
                }
            })
        ],
        editorProps: {
            attributes: {
              class: 'prose dark:prose-invert prose-sm sm:prose lg:prose-md xl:prose-xl m-5 focus:outline-none',
            },
        },
        content: '',
    })

    const [isEditable, setIsEditable] = useState(true)
    const [isPublished, updatePublishedState] = useState(false)
    const [storyUrl, updateStoryUrl] = useState("")

    useEffect(() => {
        if (editor) {
        editor.setEditable(isEditable)
        }
    }, [isEditable, editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div className='max-w-screen'>
            {editor && <BubbleMenu className='' editor={editor} tippyOptions={{ duration: 100 }}>
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-t border-b border-l border-primary rounded-l-lg focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-t border-b border-l border-primary rounded-l-lg focus:ring-primary'}>
                <i className="fas fa-bold"></i>
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-t border-b border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-t border-b border-primary focus:ring-primary'}>
                    <i className="fas fa-italic"></i>
                    </button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-t border-b border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-t border-b border-primary focus:ring-primary'}>
                    <i className="fas fa-strikethrough"></i>
                </button>
                <button onClick={setLink} className={editor.isActive('link') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-t border-b border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-t border-b border-primary focus:ring-primary'}>
                    <i className="fas fa-link"></i>
                </button>
                <button onClick={() => editor.commands.setFontFamily('EB Garamond, serif')} className={editor.isActive('textStyle', {fontFamily: 'EB Garamond, serif'}) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                    <i className="fa-solid fa-pen-fancy"></i>
                </button>
                <button onClick={() => editor.commands.setFontFamily('Mynerve, cursive')} className={editor.isActive('textStyle', {fontFamily: 'Mynerve, cursive'}) ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-primary focus:ring-primary'}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active px-4 py-2 text-sm font-medium text-white bg-primary border-b border-t border-r rounded-r-lg border-primary focus:ring-primary focus:text-white' : 'px-4 py-2 text-sm font-medium text-primary bg-white border-b border-t border-r rounded-r-lg border-primary focus:ring-primary'}>
                    <i className="fa-solid fa-highlighter"></i>
                </button>
            </BubbleMenu>
            }

            {
                isPublished ?
                    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200" role="alert">
                        <span class="font-medium">Story succesfully published!</span> If you want to see you new story now you can <a className='underline' href={storyUrl}>click here</a> or you can <button className='font-medium' onClick={() => {updatePublishedState(false)}}>click here to dismiss this message</button>.
                    </div>
                :
                    <></>
            }

            <MenuBar publishedLink={updateStoryUrl} publishedAlert={updatePublishedState} editor={editor} />
            <EditorContent className="font-writer" editor={editor} />
        </div>
    )
}