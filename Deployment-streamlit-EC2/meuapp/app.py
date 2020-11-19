#Library
import streamlit as st

#Title 
st.write("""
Model Deployment\n
Fast and clean by Wellington Dantas.\n
""")

#Information home page
st.subheader('Your name is....')

#Input
user_input = st.sidebar.text_input('What is your name?')

#Show
st.write('My name is ... ', user_input)